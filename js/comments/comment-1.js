let commentParent = document.querySelector(`[data-comments]`);
let comments = Array.from(commentParent.children).filter(el => el.id !== 'commentPushBlock');

const INITIAL_COMMENTS_COUNT = 4;
let counter = -1; 

comments.forEach((el) => {
    el.style.display = "none";
});

for (let i = 0; i < INITIAL_COMMENTS_COUNT && i < comments.length; i++) {
    comments[i].style.display = "grid";
    counter = i;
}

document
    .querySelector(`[data-load-comment]`)
    .addEventListener("click", loadComment);

function loadComment() {
    if (comments.length - 1 > counter) {
        counter++;
        comments[counter].style.display = "grid";

        if (comments.length - 1 === counter) {
            this.style.pointerEvents = "none";
        }
    } else {
        this.style.pointerEvents = "none";
    }
}


class Comment {
    constructor(commentForm, inputCommentName, inputCommentText, formImage, formAvatar, commentPushBlock) {
        this.commentForm = document.querySelector(commentForm);
        this.inputCommentName = document.querySelector(inputCommentName);
        this.inputCommentText = document.querySelector(inputCommentText);
        this.formImage = document.querySelector(formImage);
        this.formAvatar = document.querySelector(formAvatar);
        this.commentPushBlock = document.querySelector(commentPushBlock);
        this.commArrAll = [];
        this.formImageUrl = null; 
        
        this.formImageChange();
        this.pushComBlock();
        this.domOnloader();
    }

    uploadFile(file) {
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
            alert("Дозволені лише зображення (JPG, PNG, GIF).");
            this.formImage.value = ""; 
            return;
        }
        // Перевірка розміру файлу (<1 Мб)
        if (file.size > 1 * 1024 * 1024) {
            alert("Розмір файлу не повинен перевищувати 1 МБ.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.formAvatar.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
            this.formAvatar.classList.add("form__avatar--loaded");
            this.formImageUrl = e.target.result; 
        };
        reader.onerror = function (e) {
            alert("Помилка при читанні файлу.");
        };
        reader.readAsDataURL(file);
    }

    formImageChange() {
        this.formImage.addEventListener("change", () => {
            if (this.formImage.files.length > 0) {
                this.uploadFile(this.formImage.files[0]);
            }
        });
    }

    pushComm() {
        let urlAvatar = "";
        // Використовуємо завантажений URL, або дефолтний
        if (this.formImageUrl) {
            urlAvatar = this.formImageUrl;
        } else {
            urlAvatar = "../../img/elements/comments/comment-1/userpic.webp"; // Шлях до дефолтної картинки
        }

        const d = new Date();
        const p = new Date(d.getTime() - 0 * 86400000); 
        const monthA = "01,02,03,04,05,06,07,08,09,10,11,12".split(",");
        const dateNow = p.getDate() + "." + monthA[p.getMonth()] + "." + p.getFullYear();

        // HTML-шаблон нового коментаря
        const comment = `<div class="comment">
            <span class="text1 lt21">${this.inputCommentName.value}</span>
            <span class="text2"></span>
            <div class="text3">
                <img alt="img" src="${urlAvatar}">
                <div class="comment-wrapper">
                    <div class="txtCom lt22">${this.inputCommentText.value.replace(/\n/g, '<br>')}</div>
                    <div class="comment-action">
                        <div class="comment-like">
                            <a href="#">
                                <img src="../../img/elements/comments/comment-1/like.svg" alt="like icon">
                            </a>
                        </div>
                        <div class="comment-date">${dateNow}</div>
                    </div>
                </div>
            </div>
        </div>`;
        
        this.commArrAll.unshift(comment); 
        this.commentPushBlock.innerHTML = this.commArrAll.join(""); 
        localStorage.setItem("commArr", JSON.stringify(this.commArrAll)); 
        
        // Очищення форми
        this.removeInputClass();
        this.formAvatar.innerHTML = "";
        this.formAvatar.classList.remove("form__avatar--loaded");
        this.formImage.value = ""; 
        this.formImageUrl = null;
    }

    removeInputClass() {
        if (this.inputCommentName) {
            this.inputCommentName.value = "";
            this.inputCommentName.classList.remove("error");
        }
        this.inputCommentText.value = "";
        this.inputCommentText.classList.remove("error");
    }

    pushComBlock() {
        this.commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let isNameValid = this.inputCommentName ? !!this.inputCommentName.value : true;
            let isTextValid = !!this.inputCommentText.value;

            if (isNameValid && isTextValid) {
                return this.pushComm();
            } else {
                if (this.inputCommentName && !this.inputCommentName.value) {
                    this.inputCommentName.classList.add("error");
                } else if (this.inputCommentName) {
                    this.inputCommentName.classList.remove("error");
                }
                
                if (!this.inputCommentText.value) {
                    this.inputCommentText.classList.add("error");
                } else {
                     this.inputCommentText.classList.remove("error");
                }
            }
        });
    }

    domOnloader() {
        document.addEventListener("DOMContentLoaded", () => {
            let commArr = localStorage.getItem("commArr");
            if (commArr) {
                this.commArrAll = JSON.parse(commArr);
                this.commentPushBlock.innerHTML = this.commArrAll.join("");
            }
        });
    }
}

let comment = new Comment(
    "#commentForm",
    "#inputCommentName",
    "#inputCommentText",
    "#formImage",
    "#formAvatar",
    "#commentPushBlock"
);