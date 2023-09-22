const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const saveDate = localStorage.getItem("saved-date") || "";
const intervalIdArr = [];

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  // const dateFormat = inputYear +"-"+ inputMonth +"-"+ inputDate
  return dateFormat;
};

const counterMaker = function (data) {
  if (data !== saveDate) {
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  if (remaining <= 0) {
    // 만약, remaining이 0이라면 타이머가 종료되었습니다. 출력.
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    container.style.display = "none";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    //만약 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    container.style.display = "none";
    setClearInterval();
    return;
  }
  //   const remainingDate = Math.floor(remaining / 3600 / 24);
  //   const remainingHours = Math.floor(remaining / 3600) % 24;
  //   const remainingMin = Math.floor(remaining / 60) % 60;
  //   const remainingSec = Math.floor(remaining) % 60;

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  //   const days = document.getElementById("days");
  //   const hours = document.getElementById("hours");
  //   const min = document.getElementById("min");
  //   const sec = document.getElementById("sec");

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);
  //   const docKeys = Object.keys(documentObj);

  //   for (let i = 0; i < timeKeys.length; i++) {
  //     documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  //   }

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

  //   const documentObj = {
  //     days: document.getElementById("days"),
  //     hours: document.getElementById("hours"),
  //     min: document.getElementById("min"),
  //     sec: document.getElementById("sec"),
  //   };

  //   let i = 0;
  //   for (let key in documentObj) {
  //     documentObj[key].textContent = remainingObj[timeKeys[i]];
  //     i++;
  //   }

  //   documentObj["days"].textContent = remainingObj["remainingDate"];
  //   documentObj["hours"].textContent = remainingObj["remainingHours"];
  //   documentObj["min"].textContent = remainingObj["remainingMin"];
  //   documentObj["sec"].textContent = remainingObj["remainingSec"];
};

const starter = function (targetDateInput) {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => {
    counterMaker(targetDateInput);
  }, 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.style.display = "flex";
  messageContainer.innerHTML = "<h3>D-Day를 입력하세요</h3>";
  setClearInterval();
};

if (saveDate) {
  starter(saveDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력하세요</h3>";
}
