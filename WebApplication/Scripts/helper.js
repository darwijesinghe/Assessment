/*jshint esversion: 6 */

// alert types
export const AlertType = {
  error: "al_error",
  success: "al_success",
};

// alert message
export const Alert = {
  show(type, message, container) {
    try {
      this.cleantimeout = null;
      const element = document.createElement("div");
      element.className = `alert ${type}`;
      element.id = "alert";
      element.role = "alert";

      clearTimeout(this.cleantimeout);

      if (document.getElementById("alert")) {
        document.getElementById("al_message").textContent = message;
      } else {
        element.innerHTML = `<div class="al_content">
                                    <p id="al_message">${message}</p>
                                </div>`;

          document.getElementById(container).appendChild(element);
      }

      // hide alert
      this.cleantimeout = setTimeout(() => {
        element.remove();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  },
}

// initialize methods
document.addEventListener("DOMContentLoaded", () => {
  try {
    // fetch loading
    Process.init();
  } catch (error) {
    console.log(error);
  }
});

// error handling
export const Error = {
  seterror(target, message) {
    try {
      const pelement = target.parentElement;
      const errorelement = pelement.querySelector("span");
      errorelement.innerText = message;
      target.focus();
    } catch (e) {
      console.log(e);
    }
  },

  diserror(target) {
    try {
      const pelement = target.parentElement;
      const errorelement = pelement.querySelector("span");
      errorelement.innerText = "";
    } catch (e) {
      console.log(e);
    }
  },
};

// api fetch loading
export const Process = {
  init() {
    // initializing
    try {
      this.element = document.createElement("div");
      this.element.className = "loading hide-loader";
      this.element.innerHTML = `<div class="loading-spinner">
                                    <svg class="spinner" viewBox="0 0 50 50" style="height: 50px; width: 50px;">
                                        <circle class="path" cx="25" cy="25" r="20"></circle>
                                    </svg>
                                </div>`;
      document.body.appendChild(this.element);
    } catch (error) {
      console.log(error);
    }
  },

  show() {
    try {
      // show fetch process
      this.element.className = "loading show-loader";
    } catch (error) {
      console.log(error);
    }
  },

  hide() {
    try {
      // hide fetch process
      this.element.className = "loading hide-loader";
    } catch (error) {
      console.log(error);
    }
  },
}

// generate html data submit form
export const submitForm = (title, id = 0, name = '', email = '', position = '') =>
{
    return `<div class="modal" id="modal">
                <div class="modal_window">
                    <div class="mod_title">
                        <p class="mod_topic">${title}</p>
                        <div class="mod_close">
                            <span id="mod-close" role="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="mod_content">
                        <form id="myform">
                            <div class="input_control">
                                <input type="hidden" id="id" value="${id}">
                                <input type="text" id="name" value="${name}" placeholder="Name">
                                <span class="val_msg"></span>
                            </div>
                            <div class="input_control">
                                <input type="text" id="email" value="${email}" placeholder="Email">
                                <span class="val_msg"></span>
                            </div>
                            <div class="input_control">
                                <input type="text" id="position" value="${position}" placeholder="Position">
                                <span class="val_msg"></span>
                            </div>
                        </form>
                    </div>
                    <div class="mod_actions">
                        <button class="button" id="mod-save" type="submit" form="myform" role="button">Save</button>
                    </div>
                </div>
            </div>`;
};

// confirm dialog
export const Confirm = {
  show(title, message, callback) {
    try {
      const html = `<div class="confirm" id="confirm">
            <div class="confirm_window">
                <div class="con_title">
                    <p class="con_topic">${title}</p>
                    <div class="con_close">
                        <span id="con-close" role="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                                </path>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="con_ask">
                    <p class="con_question">${message}</p>
                </div>
                <div class="con_actions">
                    <button class="button con_yes" id="con-yes">Yes</button>
                    <button class="button con_no" id="con-no">No</button>
                </div>
            </div>
        </div>
      `;

      const template = document.createElement("template");
      template.innerHTML = html;

      // events
      const backDrop = template.content.getElementById("confirm");
      const btnClose = template.content.getElementById("con-close");
      const btnYes = template.content.getElementById("con-yes");
      const btnNo = template.content.getElementById("con-no");

      backDrop.addEventListener("click", (e) => {
        if (e.target === backDrop) {
          this.hide(backDrop);
        }
      })

      btnNo.addEventListener("click", (e) => {
        this.hide(backDrop);
      })

      btnClose.addEventListener("click", (e) => {
        this.hide(backDrop);
      })

      btnYes.addEventListener("click", (e) => {
        this.hide(backDrop);
        callback();
      })

      document.body.appendChild(template.content);
    } catch (error) {
      console.log(error);
    }
  },
  // hide dialog
  hide(element) {
    try {
      document.body.removeChild(element);
    } catch (error) {
      console.log(error);
    }
  }
}