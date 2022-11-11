import { getUsername } from "../../utils/storage.js";

export default function createMenu() {
  const { pathname } = document.location;
  console.log(pathname);
  const container = document.querySelector(".menu-container");

  const username = getUsername();

  console.log(username);

  let authLink = `<a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }">Login</a>`;

  if (username) {
    authLink = `<a href="admin.html" class="${
      pathname === "/admin.html" ? "active" : ""
    }">Add Product</a>
    <span>Hi ${username}</span>`;
  }

  container.innerHTML = `<div class="menu">
                                <a href="admin.html" class="${
                                  pathname === "/admin.html"  ? "active" : ""
                                }">Admin</a>
                                ${authLink}
                        </div>`;
}
