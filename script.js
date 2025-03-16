/********************************
 * DOM Elements
 ********************************/
const btnShowLogin = document.getElementById("btnShowLogin");
const btnShowRegister = document.getElementById("btnShowRegister");
const loggedInMenu = document.getElementById("loggedInMenu");
const displayNameSpan = document.getElementById("displayName");
const arrowIcon = document.getElementById("arrowIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

// Modal Auth
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.getElementById("closeLoginModal");
const registerModal = document.getElementById("registerModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");

// Input login
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const btnLoginSubmit = document.getElementById("btnLoginSubmit");

// Input register
const registerEmail = document.getElementById("registerEmail");
const registerUsername = document.getElementById("registerUsername");
const registerPassword = document.getElementById("registerPassword");
const registerError = document.getElementById("registerError");
const btnRegisterSubmit = document.getElementById("btnRegisterSubmit");

// Chuyển modal
const toRegisterModal = document.getElementById("toRegisterModal");
const toLoginModal = document.getElementById("toLoginModal");

// Nút đăng xuất
const btnLogout = document.getElementById("btnLogout");
const btnLogoutDirect = document.getElementById("btnLogoutDirect");

// Thông báo (toast)
const notification = document.getElementById("notification");

// Balance hiển thị
const userBalanceSpan = document.getElementById("userBalance");

// Hamburger menu & sidebar
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("sidebar");

// Sidebar có nút “Tắt (X)” cho menu
const btnCloseSidebar = document.getElementById("btnCloseSidebar");

// Nút nạp bank, nạp thẻ
const btnNapBank = document.getElementById("btnNapBank");
const btnNapTheCao = document.getElementById("btnNapTheCao");

// Modal nạp bank
const napBankModal = document.getElementById("napBankModal");
const closeNapBankModal = document.getElementById("closeNapBankModal");
const bankAmountInput = document.getElementById("bankAmount");
const bankNote = document.getElementById("bankNote");
const btnSubmitBank = document.getElementById("btnSubmitBank");

// Modal nạp thẻ cào
const napTheModal = document.getElementById("napTheModal");
const closeNapTheModal = document.getElementById("closeNapTheModal");
const cardAmountInput = document.getElementById("cardAmount");
const cardTypeInput = document.getElementById("cardType");
const cardSerialInput = document.getElementById("cardSerial");
const cardCodeInput = document.getElementById("cardCode");
const btnSubmitCard = document.getElementById("btnSubmitCard");

// Nút Lịch sử mua hàng (trong sidebar)
const btnOrderHistory = document.getElementById("btnOrderHistory");
const orderHistoryModal = document.getElementById("orderHistoryModal");
const closeOrderHistoryModal = document.getElementById("closeOrderHistoryModal");
const orderHistoryContent = document.getElementById("orderHistoryContent");

/********************************
 * Hàm hiển thị thông báo (toast)
 * type: "success" (mặc định) hay "error"
 ********************************/
// Giả sử notification là phần tử thông báo

function showNotification(message, type = "success") {
  if (!notification) return;
  
  // Tùy chỉnh icon và màu sắc dựa trên loại thông báo
  let iconHTML = "";
  if (type === "error") {
    iconHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
    // Màu nền nhạt và chữ cho cảnh báo
    notification.style.backgroundColor = "#fdecea"; // nền đỏ nhạt
    notification.style.color = "#d93025"; // chữ đỏ
  } else {
    iconHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
    // Màu nền nhạt và chữ cho thành công
    notification.style.backgroundColor = "#e6f4ea"; // nền xanh nhạt
    notification.style.color = "#34a853"; // chữ xanh lá
  }
  
  // Ghép icon và nội dung thông báo
  notification.innerHTML = `<span class="icon">${iconHTML}</span><span class="message">${message}</span>`;
  
  // Loại bỏ các lớp ẩn và fade-out, thêm hiệu ứng fade-in
  notification.classList.remove("hidden", "fade-out");
  // Khởi tạo lại hiệu ứng (nếu cần)
  void notification.offsetWidth;
  notification.classList.add("fade-in");
  
  // Sau 2 giây, chuyển sang fade-out
  setTimeout(() => {
    notification.classList.remove("fade-in");
    notification.classList.add("fade-out");
  }, 4000);
  
  // Sau 3 giây, ẩn thông báo và xóa các lớp hiệu ứng
  setTimeout(() => {
    notification.classList.add("hidden");
    notification.classList.remove("fade-out");
  }, 6000);
}

/********************************
 * Mở/Đóng Modal Auth
 ********************************/
if (btnShowLogin) {
  btnShowLogin.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
    loginError.textContent = "";
  });
}
if (btnShowRegister) {
  btnShowRegister.addEventListener("click", () => {
    registerModal.classList.remove("hidden");
    registerError.textContent = "";
  });
}
if (closeLoginModal) {
  closeLoginModal.addEventListener("click", () => {
    loginModal.classList.add("hidden");
  });
}
if (closeRegisterModal) {
  closeRegisterModal.addEventListener("click", () => {
    registerModal.classList.add("hidden");
  });
}
if (toRegisterModal) {
  toRegisterModal.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.add("hidden");
    registerModal.classList.remove("hidden");
  });
}
if (toLoginModal) {
  toLoginModal.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.classList.add("hidden");
    loginModal.classList.remove("hidden");
  });
}

/********************************
 * Đăng nhập Email/Password
 ********************************/
if (btnLoginSubmit) {
  btnLoginSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const email = (loginEmail.value || "").trim();
    const password = (loginPassword.value || "").trim();
    if (!email || !password) {
      loginError.textContent = "Vui lòng nhập email và mật khẩu!";
      return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        loginModal.classList.add("hidden");
        showNotification("Đăng nhập thành công!");
      })
      .catch((error) => {
        loginError.textContent = error.message;
      });
  });
}

/********************************
 * Đăng ký Email/Password
 ********************************/
if (btnRegisterSubmit) {
  btnRegisterSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const email = (registerEmail.value || "").trim();
    const password = (registerPassword.value || "").trim();
    const username = (registerUsername.value || "").trim();
    if (!email || !password || !username) {
      registerError.textContent = "Vui lòng nhập đủ thông tin!";
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return userCredential.user.updateProfile({ displayName: username });
      })
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          firebase.database().ref("users/" + currentUser.uid).set({ balance: 0 });
        }
        registerModal.classList.add("hidden");
        showNotification("Đăng ký thành công!");
      })
      .catch((error) => {
        registerError.textContent = error.message;
      });
  });
}

/********************************
 * Đăng xuất
 ********************************/
function handleLogout() {
  firebase.auth().signOut()
    .then(() => {
      dropdownMenu.classList.add("hidden");
      showNotification("Đăng xuất thành công!");
    })
    .catch((error) => {
      console.error(error);
    });
}
if (btnLogout) {
  btnLogout.addEventListener("click", handleLogout);
}
if (btnLogoutDirect) {
  btnLogoutDirect.addEventListener("click", handleLogout);
}

/********************************
 * Mở/Đóng Dropdown Menu
 ********************************/
if (arrowIcon) {
  arrowIcon.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });
}

/********************************
 * Hamburger Menu & Tắt (X)
 ********************************/
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.remove("hidden");
  });
}
if (btnCloseSidebar) {
  btnCloseSidebar.addEventListener("click", () => {
    sidebar.classList.add("hidden");
  });
}

/********************************
 * Nạp Bank
 ********************************/
if (btnNapBank) {
  btnNapBank.addEventListener("click", () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      showNotification("Bạn cần đăng nhập để nạp tiền!", "error");
      return;
    }
    napBankModal.classList.remove("hidden");
    bankNote.textContent = user.displayName || user.email;
  });
}
if (closeNapBankModal) {
  closeNapBankModal.addEventListener("click", () => {
    napBankModal.classList.add("hidden");
  });
}
if (btnSubmitBank) {
  btnSubmitBank.addEventListener("click", () => {
    const user = firebase.auth().currentUser;
    if (!user) return;
    const amount = parseInt(bankAmountInput.value, 10) || 0;
    if (amount <= 0) {
      showNotification("Vui lòng nhập số tiền hợp lệ!", "error");
      return;
    }
    const ref = firebase.database().ref("rechargeRequests").push();
    ref.set({
      userId: user.uid,
      type: "bank",
      amount: amount,
      status: false,    // false: chưa duyệt
      processed: false, // chưa cộng tiền
      createdAt: Date.now()
    })
    .then(() => {
      showNotification("Yêu cầu nạp bank đã được gửi. Chờ Admin duyệt!");
      napBankModal.classList.add("hidden");
      bankAmountInput.value = "";
    })
    .catch(err => {
      console.error(err);
      showNotification("Lỗi khi gửi yêu cầu nạp bank!", "error");
    });
  });
}

/********************************
 * Nạp Thẻ Cào
 ********************************/
if (btnNapTheCao) {
  btnNapTheCao.addEventListener("click", () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      showNotification("Bạn cần đăng nhập để nạp tiền!", "error");
      return;
    }
    napTheModal.classList.remove("hidden");
  });
}
if (closeNapTheModal) {
  closeNapTheModal.addEventListener("click", () => {
    napTheModal.classList.add("hidden");
  });
}
if (btnSubmitCard) {
  btnSubmitCard.addEventListener("click", () => {
    const user = firebase.auth().currentUser;
    if (!user) return;
    const amount = parseInt(cardAmountInput.value, 10) || 0;
    const type = cardTypeInput.value.trim();
    const serial = cardSerialInput.value.trim();
    const code = cardCodeInput.value.trim();
    if (amount <= 0 || !type || !serial || !code) {
      showNotification("Vui lòng nhập đủ thông tin thẻ!", "error");
      return;
    }
    const ref = firebase.database().ref("rechargeRequests").push();
    ref.set({
      userId: user.uid,
      type: "card",
      amount: amount,
      cardType: type,
      cardSerial: serial,
      cardCode: code,
      status: false,
      processed: false,
      createdAt: Date.now()
    })
    .then(() => {
      showNotification("Yêu cầu nạp thẻ đã được gửi. Chờ Admin duyệt!");
      napTheModal.classList.add("hidden");
      cardAmountInput.value = "";
      cardTypeInput.value = "";
      cardSerialInput.value = "";
      cardCodeInput.value = "";
    })
    .catch(err => {
      console.error(err);
      showNotification("Lỗi khi gửi yêu cầu nạp thẻ!", "error");
    });
  });
}

/********************************
 * Xử lý Mua Ngay (sản phẩm)
 * Mỗi nút “Mua Ngay” cần có các thuộc tính data: data-price, data-product, data-download
 ********************************/
function handleBuyNow(btn) {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    showNotification("Bạn phải đăng nhập trước khi mua!", "error");
    loginModal.classList.remove("hidden");
    return;
  }
  const price = parseInt(btn.getAttribute("data-price"), 10);
  const productName = btn.getAttribute("data-product");
  const downloadLink = btn.getAttribute("data-download");
  let currentBalance = parseInt(userBalanceSpan.textContent, 10) || 0;
  if (currentBalance < price) {
    showNotification("Số dư không đủ để mua sản phẩm!", "error");
    return;
  }
  const userBalanceRef = firebase.database().ref("users/" + currentUser.uid + "/balance");
  userBalanceRef.transaction((currentVal) => {
    currentVal = currentVal || 0;
    if (currentVal >= price) {
      return currentVal - price;
    } else {
      return; // abort transaction
    }
  }).then(result => {
    if (!result.committed) {
      showNotification("Số dư không đủ!", "error");
    } else {
      // Ghi đơn hàng vào orders/{user.uid}
      const orderRef = firebase.database().ref("orders/" + currentUser.uid).push();
      const orderData = {
        productName: productName,
        price: price,
        downloadLink: downloadLink,
        timestamp: Date.now()
      };
      orderRef.set(orderData)
        .then(() => {
          showNotification("Mua thành công! <a href='" + downloadLink + "' target='_blank'>Tải ngay</a>");
        })
        .catch(err => {
          console.error(err);
          showNotification("Lỗi khi lưu đơn hàng!", "error");
        });
    }
  }).catch(error => {
    console.error("Transaction error: ", error);
    showNotification("Lỗi khi mua hàng!", "error");
  });
}

/********************************
 * Xử lý nút Mua Ngay (Wrapper)
 ********************************/
function handleBuyNowWrapper(event) {
  handleBuyNow(event.currentTarget);
}

/********************************
 * Lịch sử Mua Hàng
 ********************************/
function loadOrderHistory() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const ordersRef = firebase.database().ref("orders/" + user.uid);
  ordersRef.once("value").then(snapshot => {
    let orders = [];
    snapshot.forEach(childSnapshot => {
      orders.push(childSnapshot.val());
    });
    orders.sort((a, b) => b.timestamp - a.timestamp);
    orderHistoryContent.innerHTML = "";
    if (orders.length === 0) {
      orderHistoryContent.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
    } else {
      orders.forEach(order => {
        const date = new Date(order.timestamp).toLocaleString();
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-item");
        orderDiv.innerHTML = "<p><strong>Sản phẩm:</strong> " + order.productName + "</p>" +
                             "<p><strong>Số tiền:</strong> " + order.price + "đ</p>" +
                             "<p><strong>Thời gian:</strong> " + date + "</p>" +
                             "<p><strong>Link tải:</strong> <a href='" + order.downloadLink + "' target='_blank'>Tải ngay</a></p><hr/>";
        orderHistoryContent.appendChild(orderDiv);
      });
    }
  });
}
if (btnOrderHistory) {
  btnOrderHistory.addEventListener("click", () => {
    orderHistoryModal.classList.remove("hidden");
    loadOrderHistory();
  });
}
if (closeOrderHistoryModal) {
  closeOrderHistoryModal.addEventListener("click", () => {
    orderHistoryModal.classList.add("hidden");
  });
}

/********************************
 * Lắng nghe Auth State & Cập nhật Balance
 ********************************/
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    btnShowLogin.classList.add("hidden");
    btnShowRegister.classList.add("hidden");
    loggedInMenu.classList.remove("hidden");
    displayNameSpan.textContent = user.displayName || user.email;
    const userRef = firebase.database().ref("users/" + user.uid + "/balance");
    userRef.on("value", (snapshot) => {
      let bal = snapshot.val();
      if (bal === null) {
        bal = 0;
        userRef.set(0);
      }
      userBalanceSpan.textContent = bal;
    });
    // Lắng nghe các giao dịch nạp tiền của user để cộng số dư khi status chuyển thành true
    const rechargeRef = firebase.database().ref("rechargeRequests").orderByChild("userId").equalTo(user.uid);
    rechargeRef.on("child_changed", (snapshot) => {
      const data = snapshot.val();
      if (data.status === true && !data.processed) {
        const rechargeAmount = data.amount;
        const userBalanceRef = firebase.database().ref("users/" + user.uid + "/balance");
        userBalanceRef.transaction((currentBalance) => {
          return (currentBalance || 0) + rechargeAmount;
        }).then(result => {
          if (result.committed) {
            snapshot.ref.update({ processed: true });
            showNotification("Số dư được cộng: +" + rechargeAmount + "đ");
          }
        }).catch(err => {
          console.error(err);
          showNotification("Lỗi khi cập nhật số dư!", "error");
        });
      }
    });
  } else {
    btnShowLogin.classList.remove("hidden");
    btnShowRegister.classList.remove("hidden");
    loggedInMenu.classList.add("hidden");
    userBalanceSpan.textContent = "0";
  }
});

// thông tin tài khoản của người dùng
    // Lấy phần tử select và span hiển thị
const packageSelect = document.getElementById("packageSelect");
const chosenText = document.getElementById("chosenText");

// Lắng nghe sự kiện change khi người dùng chọn option
packageSelect.addEventListener("change", () => {
  const value = packageSelect.value;
  if (value) {
    chosenText.textContent = value;
  } else {
    chosenText.textContent = "Chưa chọn";
  }
});


    window.addEventListener('load', function() {
      var audio = document.getElementById('audioPlayer');
      
      audio.play().catch(function(error) {
        console.log("Không thể tự động phát nhạc: ", error);
      });
    });




// Cảnh Báo 
