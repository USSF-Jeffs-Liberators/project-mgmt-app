import React from "react";
import ProjectCost from "./ProjectCost";
import { FundingRequestModal } from "./components/FundingRequestModal";
import { ExpenseModal } from "./components/ExpenseModal";
import { ReviewModal } from "./components/ReviewModal";

var dial = null;

class FinancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 3,
      project_num: 2,
      userType: 'Project Manager',
      users: [],
      selectedProject: {},
      teamMembers: [],
      selectedProjectExpenses: [],
      projectTasks: [],
      projectFundingRequests: [],
      displayProjectCosts: false,
      showFundingRequestModal: false,
      showExpenseModal: false,
      showReviewModal: false,
      selectedExpense: null,
      selectedFundingRequest: null,
      isProgressBarDisplayed: false,
      progress: 0,
      months: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ]
    };
  }

  async componentDidMount() {
    await this.getProject(this.state.project_num);
    this.getUsers()
    this.getTeamMembers()
    this.getTasks()
    this.getExpenses();
    this.getFundingRequests();
  }

  async getProject() {
    const response = await fetch(
      `http://localhost:3001/projects/${this.state.project_num}`
    );
    const json = await response.json();
    this.setState({ selectedProject: json[0] }); // TEST FOR PROJECT 3
  }

  async getUsers() {
    const response1 = await fetch(`http://localhost:3001/users`);
    const json1 = await response1.json();
    this.setState({ users: json1 });
  }

  async getTeamMembers() {
    const response2 = await fetch(
      `http://localhost:3001/projects/${this.state.selectedProject.project_id}/team`
    );
    const json2 = await response2.json();
    this.setState({ teamMembers: json2 });
  }

  async getTasks() {
    const response4 = await fetch(
      `http://localhost:3001/projects/${this.state.selectedProject.project_id}/tasks`
    );
    const json4 = await response4.json();
    this.setState({ projectTasks: json4 });
  }

  async getExpenses() {
    const response3 = await fetch(
      `http://localhost:3001/projects/${this.state.selectedProject.project_id}/expenses`
    );
    const json3 = await response3.json();
    this.setState({ selectedProjectExpenses: json3 });
  }

  async getFundingRequests() {
    const response5 = await fetch(
      `http://localhost:3001/projects/${this.state.selectedProject.project_id}/funding-requests`
    );
    const json5 = await response5.json();
    this.setState({ projectFundingRequests: json5 });
  }

  getExpenseDescription(expense) {
    if (expense.expense_desc !== null) {
      return expense.expense_desc;
    } else if (expense.expense_type === "Labor") {
      for (var i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i].user_id === expense.employee) {
          return (
            this.state.users[i].first_name + " " + this.state.users[i].last_name
          );
        }
      }
    } else {
      return "N/A";
    }
  }

  getPayRate(expense) {
    // alert(JSON.stringify(expense))
    var payRate = "";
    let dailyRate = 0;
    for (let i = 0; i < this.state.teamMembers.length; i++) {
      if (this.state.teamMembers[i].user_id === expense.employee) {
        dailyRate = this.state.teamMembers[i].daily_rate;
        payRate += "$" + this.state.teamMembers[i].daily_rate + " x ";
      }
    }
    var sumDays = 0;
    for (let i = 0; i < this.state.projectTasks.length; i++) {
      if (this.state.projectTasks[i].assigned_to === expense.employee) {
        sumDays += this.state.projectTasks[i].duration;
      }
    }
    payRate += sumDays + " work days";

    // if (dailyRate !== 0 && sumDays > 0) {      
    //   this.updateLaborExpense(expense, (dailyRate*sumDays))
    // }

    return payRate;
  }

  // async updateLaborExpense(expense, expenseAmount) {
  //   var laborExpense = {};
  //   laborExpense.expense_amount = expenseAmount

  //   await fetch(
  //     `http://localhost:3001/update-labor-expense/${expense.expense_id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(laborExpense),
  //     }
  //   );
  //   this.getExpenses();
  //   this.updateCurrentCost(0);
  // }

  getFullName(user_id) {
    if (user_id === null) {
      return "N/A";
    }
    for (var i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].user_id === user_id) {
        return (
          this.state.users[i].first_name + " " + this.state.users[i].last_name
        );
      }
    }
  }

  getDollarFigure(amount) {
    if (amount === undefined || amount === null) {
      return "";
    }
    var output =
      "$" + amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    if (output.includes(".")) {
      if (output.split(".")[1].length === 0) {
        output += "00";
      }
      if (output.split(".")[1].length === 1) {
        output += "0";
      }
    } else {
      output += ".00";
    }
    return output;
  }

  parseDatabaseDate(databaseDate) {
    if (databaseDate === null) {
      return "N/A";
    }
    var date = new Date(databaseDate);
    return (
      date.getDate() +
      " " +
      this.state.months[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  }

  hasPendingFundingRequest(fundingRequests) {
    if (fundingRequests.length !== 0) {
      for (let i = 0; i < fundingRequests.length; i++) {
        if (fundingRequests[i].review_status === 'Pending Review') {
          return true
        }
      }
    }
    return false
  }

  openExpenseModal(expense) {
    this.setState({ selectedExpense: expense });
    this.setExpenseModalElements(expense);
    this.setState({ showExpenseModal: true });
    this.toggleElementsOff()
  }

  closeExpenseModal() {
    this.setState({ selectedExpense: null });
    this.setState({ showExpenseModal: false });
    this.toggleElementsOn()
  }

  openFundingRequestModal(request) {
    this.setState({selectedFundingRequest:request})
    this.setFundingRequestModalElements(request)
    this.setState({ showFundingRequestModal: true });
    this.toggleElementsOff()
  }

  closeFundingRequestModal() {
    this.setState({ selectedFundingRequest: null });
    this.setState({ showFundingRequestModal: false });
    this.toggleElementsOn()
  }

  openReviewModal(request) {
    this.setState({selectedFundingRequest:request})
    this.setReviewModalElements(request)
    this.setState({ showReviewModal: true });
    this.toggleElementsOff()
  }

  closeReviewModal() {
    this.setState({ selectedFundingRequest: null });
    this.setState({ showReviewModal: false });
    this.toggleElementsOn()
  }

  toggleElementsOff() {
    document.querySelector(".modal-wrapper").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
    document.querySelectorAll(".rux-button:not(.modal-button),.modal-button:not(.rux-button)").forEach(element => element.style.display = 'none')
    document.querySelector("#progress-svg").style.display = 'none';
  }

  toggleElementsOn() {
    document.querySelector("body").style.overflow = "auto";
    document.querySelectorAll(".rux-button:not(.modal-button),.modal-button:not(.rux-button)").forEach(element => element.style.display = 'inline-flex')
    document.querySelector("#progress-svg").style.display = 'inline-flex';
  }

  setExpenseModalElements(expense) {
    if (expense !== null) {
      document.getElementById("expense-desc").value = expense.expense_desc;
      document.getElementById("expense-type").value = expense.expense_type;
      document.getElementById("expense-amount").value = expense.expense_amount;
    } else {
      document.getElementById("expense-desc").value = "";
      document.getElementById("expense-type").value = "";
      document.getElementById("expense-amount").value = "";
    }
  }

  setFundingRequestModalElements(request) {
    if (request !== null) {
      document.getElementById("request-justification").value = request.justification;
      document.getElementById("request-suspense-date").value = new Date(request.suspense_date).toISOString().split('T')[0];
      document.getElementById("request-amount").value = request.request_amount;
    } else {
      document.getElementById("request-justification").value = "";
      document.getElementById("request-suspense-date").value = "";
      document.getElementById("request-amount").value = "";
    }
  }

  setReviewModalElements(request) {
    document.getElementById("review-submitted-by").innerHTML = `Submitted By:  ${this.getFullName(request.initiator)}`
    document.getElementById("review-submit-date").innerHTML = `Submit Date:  ${this.parseDatabaseDate(request.submit_date)}`
    document.getElementById("review-amount").innerHTML = `Amount:  ${this.getDollarFigure(request.request_amount)}`
    document.getElementById("review-justification").value = request.justification
    document.getElementById("review-suspense-date").innerHTML = `Suspense Date:  ${this.parseDatabaseDate(request.suspense_date)}`
  }

  async addExpense(expenseDesc, expenseType, expenseAmount) {
    var expense = {};
    expense.project_id = this.state.selectedProject.project_id;
    expense.expense_desc = expenseDesc;
    expense.expense_type = expenseType;
    expense.expense_amount = expenseAmount;

    await fetch("http://localhost:3001/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    }).then(this.getExpenses());

    await this.updateCurrentCost(expenseAmount);
  }

  async editExpense(expenseDesc, expenseType, expenseAmount) {
    var expense = {};
    expense.project_id = this.state.selectedProject.project_id;
    expense.expense_desc = expenseDesc;
    expense.expense_type = expenseType;
    expense.expense_amount = expenseAmount;

    await fetch(
      `http://localhost:3001/edit-expense/${this.state.selectedExpense.expense_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      }
    );
    await this.getExpenses();
    await this.updateCurrentCost(0);
  }

  async deleteExpense(expense) {
    await fetch(`http://localhost:3001/expenses/${expense.expense_id}`, {
      method: "DELETE",
    });
    await this.updateCurrentCost(expense.expense_amount * -1);
  }

  async updateCurrentCost(expenseAmount) {
    var newCurrentCost = 0;
    for (let i = 0; i < this.state.selectedProjectExpenses.length; i++) {
      newCurrentCost += parseFloat(
        this.state.selectedProjectExpenses[i].expense_amount
      );
    }
    newCurrentCost += parseFloat(expenseAmount);

    await fetch(
      `http://localhost:3001/update-project-cost/${this.state.selectedProject.project_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ current_cost: newCurrentCost }),
      }
    );

    await this.getProject();
    await this.getExpenses();

    let oldProgressBar = document.getElementById("progress-svg");
    oldProgressBar.remove();
    this.setState({ isProgressBarDisplayed: false });
  }

  async createFundingRequest(amount, justification, suspenseDate) {
    var fundingRequest = {};
    fundingRequest.project_id = this.state.selectedProject.project_id;
    fundingRequest.initiator = this.state.user_id;
    fundingRequest.request_amount = amount;
    fundingRequest.justification = justification;
    fundingRequest.submit_date = new Date().toISOString().slice(0, 10);
    fundingRequest.suspense_date = suspenseDate;

    await fetch("http://localhost:3001/funding-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fundingRequest),
    });
    this.getFundingRequests();
  }

  async editFundingRequest(amount, justification, suspenseDate) {
    var fundingRequest = {};
    fundingRequest.project_id = this.state.selectedProject.project_id;
    fundingRequest.request_amount = amount;
    fundingRequest.justification = justification;
    fundingRequest.suspense_date = suspenseDate;

    await fetch(
      `http://localhost:3001/edit-funding-requests/${this.state.selectedFundingRequest.request_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fundingRequest),
      }
    );
    await this.getFundingRequests();
  }

  async deleteFundingRequest(request) {
    await fetch(`http://localhost:3001/funding-requests/${request.request_id}`, {
      method: "DELETE",
    });
    this.getFundingRequests();
  }

  async reviewFundingRequest(reviewNote, reviewStatus) {
    var fundingRequest = {};
    fundingRequest.project_id = this.state.selectedProject.project_id;
    fundingRequest.review_date = new Date().toISOString().slice(0, 10);
    fundingRequest.review_status = reviewStatus
    fundingRequest.review_note = reviewNote
    fundingRequest.reviewed_by = this.state.user_id;

    await fetch(
      `http://localhost:3001/review-funding-requests/${this.state.selectedFundingRequest.request_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fundingRequest),
      }
    );
    this.getFundingRequests();
  }

  getStatusColor(status) {
    if (status === "Approved") {
      return "#08DB0F";
    }
    if (status === "Denied") {
      return "#FF0000";
    }
    if (status === "Pending Review") {
      return "FDC12A";
    }
    return "#ffffff";
  }

  formatAmount(amount) {
    if (amount.length > 0 && amount.includes(',')) {
      amount = amount.replaceAll(',','')
    }
    if (!isNaN(amount)) {
      amount = parseFloat(amount).toFixed(2).toString()
    }
    return amount
  }

  verifyDescription(expenseDesc) {
    if (expenseDesc.length > 0) {
      return true
    }
    alert('The expense requires a description.')
  }

  verifyType(expenseType) {
    if (expenseType.length > 0) {
      return true
    }
    alert('The expense requires a type.')
  }

  verifyAmount(amount) {
    if (amount.length > 0) {
      if (!isNaN(amount)) {
        if (parseFloat(amount) > 0) {
          return true
        } else {
          alert('The entered amount must be greater than 0.')
        }
      } else {
        alert('The entered amount is not a valid number.')
      }
    } else {
      alert('An amount is required.')
    }
  }

  verifyJustification(justification) {
    if (justification.length > 0) {
      return true
    }
    alert('The funding request requires a justification.')
  }

  verifyDate(date) {
    if (date.length > 0) {
      let suspenseDate = new Date(date)
      let today = new Date()
      if (suspenseDate > today) {
        return true
      }
      alert('The suspense date must be after today.')
    } else {
      alert('A suspense date is required.')
    }
  }

  setCircleProgress() {
    if (
      this.state.isProgressBarDisplayed === false &&
      this.state.progress !== 0
    ) {
      this.setState({ isProgressBarDisplayed: true });
      var Dial = function (container) {
        this.container = container;
        this.size = this.container.dataset.size;
        this.strokeWidth = this.size / 8;
        this.radius = this.size / 2 - this.strokeWidth / 2;
        this.value = this.container.dataset.value;
        this.direction = this.container.dataset.arrow;
        this.svg;
        this.defs;
        this.slice;
        this.overlay;
        this.text;
        this.arrow;
        this.create();
      };

      Dial.prototype.create = function () {
        this.createSvg();
        this.createDefs();
        this.createSlice();
        this.createOverlay();
        this.createText();
        this.createArrow();
        this.container.appendChild(this.svg);
      };

      Dial.prototype.createSvg = function () {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "progress-svg");
        svg.setAttribute("width", this.size + "px");
        svg.setAttribute("height", this.size + "px");
        this.svg = svg;
      };

      Dial.prototype.createDefs = function () {
        var defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        );
        var linearGradient = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        linearGradient.setAttribute("id", "gradient");
        var stop1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop1.setAttribute("stop-color", "#6E4AE2");
        stop1.setAttribute("offset", "0%");
        linearGradient.appendChild(stop1);
        var stop2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop2.setAttribute("stop-color", "#78F8EC");
        stop2.setAttribute("offset", "100%");
        linearGradient.appendChild(stop2);
        var linearGradientBackground = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        linearGradientBackground.setAttribute("id", "gradient-background");
        var stop1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop1.setAttribute("stop-color", "rgba(0, 0, 0, 0.2)");
        stop1.setAttribute("offset", "0%");
        linearGradientBackground.appendChild(stop1);
        var stop2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop2.setAttribute("stop-color", "rgba(0, 0, 0, 0.05)");
        stop2.setAttribute("offset", "100%");
        linearGradientBackground.appendChild(stop2);
        defs.appendChild(linearGradient);
        defs.appendChild(linearGradientBackground);
        this.svg.appendChild(defs);
        this.defs = defs;
      };

      Dial.prototype.createSlice = function () {
        var slice = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        slice.setAttribute("fill", "none");
        slice.setAttribute("stroke", "url(#gradient)");
        slice.setAttribute("stroke-width", this.strokeWidth);
        slice.setAttribute(
          "transform",
          "translate(" + this.strokeWidth / 2 + "," + this.strokeWidth / 2 + ")"
        );
        slice.setAttribute("class", "animate-draw");
        this.svg.appendChild(slice);
        this.slice = slice;
      };

      Dial.prototype.createOverlay = function () {
        var r = this.size - this.size / 2 - this.strokeWidth / 2;
        var circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        circle.setAttribute("cx", this.size / 2);
        circle.setAttribute("cy", this.size / 2);
        circle.setAttribute("r", r);
        circle.setAttribute("fill", "transparent"); // url(#gradient-background)
        this.svg.appendChild(circle);
        this.overlay = circle;
      };

      Dial.prototype.createText = function () {
        var fontSize = this.size / 3.5;
        var text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.setAttribute("x", this.size / 2 + fontSize / 7.5);
        text.setAttribute("y", this.size / 2 + fontSize / 4);
        text.setAttribute("font-family", "Century Gothic, Lato");
        text.setAttribute("font-size", fontSize);
        text.setAttribute("fill", "#78F8EC");
        text.setAttribute("text-anchor", "middle");
        var tspanSize = fontSize / 3;
        text.innerHTML =
          0 +
          '<tspan font-size="' +
          tspanSize +
          '" dy="' +
          -tspanSize * 1.2 +
          '">%</tspan>';
        this.svg.appendChild(text);
        this.text = text;
      };

      Dial.prototype.createArrow = function () {
        var arrowSize = this.size / 10;
        var arrowYOffset, m;
        if (this.direction === "up") {
          arrowYOffset = arrowSize / 2;
          m = -1;
        } else if (this.direction === "down") {
          arrowYOffset = 0;
          m = 1;
        }
        var arrowPosX = this.size / 2 - arrowSize / 2;
        var arrowPosY = this.size - this.size / 3 + arrowYOffset;
        var arrowDOffset = m * (arrowSize / 1.5);
        var arrow = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        arrow.setAttribute(
          "d",
          "M 0 0 " +
            arrowSize +
            " 0 " +
            arrowSize / 2 +
            " " +
            arrowDOffset +
            " 0 0 Z"
        );
        arrow.setAttribute("fill", "#97F8F0");
        arrow.setAttribute("opacity", "0.6");
        arrow.setAttribute(
          "transform",
          "translate(" + arrowPosX + "," + arrowPosY + ")"
        );
        this.svg.appendChild(arrow);
        this.arrow = arrow;
      };

      Dial.prototype.animateStart = function () {
        var v = 0;
        var self = this;
        var intervalOne = setInterval(function () {
          var p = +(v / self.value).toFixed(2);
          var a = p < 0.95 ? 2 - 2 * p : 0.05;
          v += a;
          if (v >= +self.value) {
            v = self.value;
            clearInterval(intervalOne);
          }
          self.setValue(v);
        }, 10);
      };

      Dial.prototype.animateReset = function () {
        this.setValue(0);
      };

      Dial.prototype.polarToCartesian = function (
        centerX,
        centerY,
        radius,
        angleInDegrees
      ) {
        var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians),
        };
      };

      Dial.prototype.describeArc = function (
        x,
        y,
        radius,
        startAngle,
        endAngle
      ) {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [
          "M",
          start.x,
          start.y,
          "A",
          radius,
          radius,
          0,
          largeArcFlag,
          0,
          end.x,
          end.y,
        ].join(" ");
        return d;
      };

      Dial.prototype.setValue = function (value) {
        var c = (value / 100) * 360;
        if (c === 360) c = 359.99;
        var xy = this.size / 2 - this.strokeWidth / 2;
        var d = this.describeArc(xy, xy, xy, 180, 180 + c);
        this.slice.setAttribute("d", d);
        var tspanSize = this.size / 3.5 / 3;
        this.text.innerHTML =
          Math.floor(value) +
          '<tspan font-size="' +
          tspanSize +
          '" dy="' +
          -tspanSize * 1.2 +
          '">%</tspan>';
      };

      var containers = document.getElementsByClassName("chart");
      dial = new Dial(containers[0]);
      dial.animateStart();
    }
  }

  setProgressValue(value) {
    if (!isNaN(value)) {
      this.setState({ progress: value });
    }
  }

  render() {
    return (
      <div>
        {this.state.showExpenseModal ? (
          <div
            className="back-drop"
            onClick={() => {
              this.closeExpenseModal();
            }}
          ></div>
        ) : null}
        {this.state.showFundingRequestModal ? (
          <div
            className="back-drop"
            onClick={() => {
              this.closeFundingRequestModal();
            }}
          ></div>
        ) : null}
        {this.state.showReviewModal ? (
          <div
            className="back-drop"
            onClick={() => {
              this.closeReviewModal();
            }}
          ></div>
        ) : null}
        <ExpenseModal
          selectedExpense={this.state.selectedExpense}
          showExpenseModal={this.state.showExpenseModal}
          closeExpenseModal={this.closeExpenseModal.bind(this)}
          addExpense={this.addExpense.bind(this)}
          editExpense={this.editExpense.bind(this)}
          formatAmount={this.formatAmount.bind(this)}
          verifyDescription={this.verifyDescription.bind(this)}
          verifyType={this.verifyType.bind(this)}
          verifyAmount={this.verifyAmount.bind(this)}
        />
        <FundingRequestModal
          selectedFundingRequest={this.state.selectedFundingRequest}
          showFundingRequestModal={this.state.showFundingRequestModal}
          closeFundingRequestModal={this.closeFundingRequestModal.bind(this)}
          createFundingRequest={this.createFundingRequest.bind(this)}
          editFundingRequest={this.editFundingRequest.bind(this)}
          formatAmount={this.formatAmount.bind(this)}
          verifyJustification={this.verifyJustification.bind(this)}
          verifyDate={this.verifyDate.bind(this)}
          verifyAmount={this.verifyAmount.bind(this)}
        />
        <ReviewModal
          selectedFundingRequest={this.state.selectedFundingRequest}
          showReviewModal={this.state.showReviewModal}
          closeReviewModal={this.closeReviewModal.bind(this)}
          reviewFundingRequest={this.reviewFundingRequest.bind(this)}
        />
        <ProjectCost
          userType={this.state.userType}
          selectedProject={this.state.selectedProject}
          progress={this.state.progress}
          selectedProjectExpenses={this.state.selectedProjectExpenses}
          getExpenseDescription={this.getExpenseDescription.bind(this)}
          getPayRate={this.getPayRate.bind(this)}
          projectFundingRequests={this.state.projectFundingRequests}
          getDollarFigure={this.getDollarFigure.bind(this)}
          parseDatabaseDate={this.parseDatabaseDate.bind(this)}
          getFullName={this.getFullName.bind(this)}
          hasPendingFundingRequest={this.hasPendingFundingRequest.bind(this)}
          openFundingRequestModal={this.openFundingRequestModal.bind(this)}
          openExpenseModal={this.openExpenseModal.bind(this)}
          openReviewModal={this.openReviewModal.bind(this)}
          deleteExpense={this.deleteExpense.bind(this)}
          deleteFundingRequest={this.deleteFundingRequest.bind(this)}
          getStatusColor={this.getStatusColor.bind(this)}
          setProgressValue={this.setProgressValue.bind(this)}
          setCircleProgress={this.setCircleProgress.bind(this)}
          isProgressBarDisplayed={this.state.isProgressBarDisplayed}
        />
      </div>
    );
  }
}

export default FinancePage;
