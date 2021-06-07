// ページ読み込み時処理
window.onload = function initChart() {
  // 線チャート  
  labelMax = document.getElementById("labelrange").value;
  labelList = [];
  for (let i = 0; i <= labelMax; i++) {
    labelList.push(i);
  }
  rate = document.getElementById("rate").value;
  var principal = Number(document.getElementById("principal").value);
  // totalAmount = [];
  // totalAmount.push(principal * 12);
  // for (let i = 1; i <= labelMax; i++) {
  //   totalAmount.push(principal * 12 * i);
  // }

  totalAmount = [principal];
  for (let i = 0; i < labelMax; i++){
    totalAmount.push(principal);
  }

  // gainList = [];
  // gainList.push(principal * 12);
  // for (let i = 1; i <= labelMax; i++) {
  //   var yearPrincipal = principal * 12 * i;
  //   var aiu = 1 + rate / 12;
  //   var eok = i * 12;
  //   gainList.push(Math.round(yearPrincipal * aiu ** eok));
  // }
  gainList = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = gainList[i] * rate;
    gainList.push(Math.round(gainList[i] + risoku));
  }

  changeLineChart();

  document.getElementById("rate-value").innerHTML = roundUp(rate * 100);
  document.getElementById("rate-value2").innerHTML = roundUp(rate * 100);
  document.getElementById("label-value").innerHTML = labelMax;
  document.getElementById("label-value2").innerHTML = labelMax;
  document.getElementById("maturityAmount").innerHTML = gainList[
    gainList.length - 1
  ].toLocaleString();


  // 手数料チャート
  scamFeeRate = rate - 0.02;
  scamFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = scamFeeGain[i] * scamFeeRate;
    scamFeeGain.push(Math.round(scamFeeGain[i] + risoku));
  }
  hedgeFeeRate = rate - 0.01;
  hedgeFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = hedgeFeeGain[i] * hedgeFeeRate;
    hedgeFeeGain.push(Math.round(hedgeFeeGain[i] + risoku));
  }
  vanFeeRate = rate - 0.001;
  vanFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = vanFeeGain[i] * vanFeeRate;
    vanFeeGain.push(Math.round(vanFeeGain[i] + risoku));
  }
  usVgFeeRate = rate - 0.0003;
  usVgFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = usVgFeeGain[i] * usVgFeeRate;
    usVgFeeGain.push(Math.round(usVgFeeGain[i] + risoku));
  }

  changeFeeChart();
  changeBarChart();

  // Imapact of Fee　分の手数料計算
  feeRate025 = rate - 0.0025;
  feeGain025 = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = feeGain025[i] * feeRate025;
    feeGain025.push(Math.round(feeGain025[i] + risoku));
  }

  feeRate050 = rate - 0.005;
  feeGain050 = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = feeGain050[i] * feeRate050;
    feeGain050.push(Math.round(feeGain050[i] + risoku));
  }

  feeRate150 = rate - 0.015;
  feeGain150 = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = feeGain150[i] * feeRate150;
    feeGain150.push(Math.round(feeGain150[i] + risoku));
  }

  // var scamFee = Math.round(
  //   principal * (1 + 0.2) ** labelMax
  // );
  // var hedgeFee = Math.round(
  //   // principal * 12 * labelMax * (1 + 0.1 / 12) ** (labelMax * 12)
  //   principal * (1 + 0.1) ** labelMax
  // );
  // var othersFee = Math.round(
  //   // principal * 12 * labelMax * (1 + 0.05 / 12) ** (labelMax * 12)
  //   principal * (1 + 0.05) ** labelMax
  // );
  // var vangurdFee = Math.round(
  //   // principal * 12 * labelMax * (1 + 0.01 / 12) ** (labelMax * 12)
  //   principal * (1 + 0.01) ** labelMax
  // );
  var lastIndex = gainList.length -1;

  var scamFee = gainList[lastIndex] - scamFeeGain[lastIndex];
  var hedgeFee = gainList[lastIndex] - hedgeFeeGain[lastIndex];
  var vangurdFee = gainList[lastIndex] - vanFeeGain[lastIndex];
  var usVgFee = gainList[lastIndex] - usVgFeeGain[lastIndex];

  document.getElementById("scamFee").innerHTML = scamFee.toLocaleString();
  document.getElementById("hedgeFee").innerHTML = hedgeFee.toLocaleString();
  document.getElementById("vanguardFee").innerHTML = vangurdFee.toLocaleString();
  document.getElementById("usVgFee").innerHTML = usVgFee.toLocaleString();
  document.getElementById("noFee").innerHTML = 0;

  document.getElementById("scamLoss").innerHTML = 100 - Math.round(scamFeeGain[lastIndex] /  gainList[lastIndex] * 100);
  document.getElementById("hedgeLoss").innerHTML = 100 - Math.round(hedgeFeeGain[lastIndex] /  gainList[lastIndex] * 100);
  document.getElementById("vanguardLoss").innerHTML = 100 - Math.round(vanFeeGain[lastIndex] /  gainList[lastIndex] * 100);
  document.getElementById("usVgLoss").innerHTML = 100 - Math.round(usVgFeeGain[lastIndex] /  gainList[lastIndex] * 100);

// Imapact of Fee 表
feeList = ["0", "003", "01", "025", "050", "100", "150", "200"]
yearList = ["3", "5", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130", "140", "150", "160", "170", "180", "190", "200"]
for (let i = 0; i < feeList.length; i++){
  var feeGainList;
  if(feeList[i]=="0"){
    feeGainList = gainList;
  }else if(feeList[i]=="003"){
    feeGainList = usVgFeeGain;
  }else if(feeList[i]=="01"){
    feeGainList = vanFeeGain;
  }else if(feeList[i]=="025"){
    feeGainList = feeGain025;
  }else if(feeList[i]=="050"){
    feeGainList = feeGain050;
  }else if(feeList[i]=="100"){
    feeGainList = hedgeFeeGain;
  }else if(feeList[i]=="150"){
    feeGainList = feeGain150;
  }else{
    feeGainList = scamFeeGain;
  }
  for(let j = 0; j < yearList.length; j++){
    // 手数料のみ
    var perResult = 100 - Math.round(feeGainList[Number(yearList[j])] / gainList[Number(yearList[j])] * 100);
    document.getElementById(`per-${feeList[i]}-${yearList[j]}`).innerHTML = "-" + perResult + "%";
    document.getElementById(`yen-${feeList[i]}-${yearList[j]}`).innerHTML = '<span class="money-mark">¥</span>' + feeGainList[Number(yearList[j])].toLocaleString();

    // 手数料＋税金
    var taxPerResult = 100 - Math.round(calTax(feeGainList, principal)[Number(yearList[j])] / gainList[Number(yearList[j])] * 100);
    document.getElementById(`tax-per-${feeList[i]}-${yearList[j]}`).innerHTML = "-" + taxPerResult + "%";
    document.getElementById(`tax-yen-${feeList[i]}-${yearList[j]}`).innerHTML =  '<span class="money-mark">¥</span>'  + calTax(feeGainList, principal)[Number(yearList[j])].toLocaleString();
  }
}

  // パイチャート
  loanMax = document.getElementById("loanTerm").value;
  commodityPrice = Number(document.getElementById("commodityPrice").value);
  interestRate = document.getElementById("interestRate").value;
  
  totalPayment = commodityPrice;

  for (let i = 0; i < loanMax; i++){
    interest = totalPayment * interestRate;
    totalPayment = totalPayment + interest;
  }
  
  paymentList = [commodityPrice, totalPayment - commodityPrice];
  
  changePieChart();

  document.getElementById("loanTerm-value").innerHTML = loanMax;
  document.getElementById("interestRate-value").innerHTML = roundUp(interestRate * 100);


  // FIRE  リタイア計算
  annualLoss = Number(document.getElementById("annualLoss").value);
  document.getElementById("retireMoney").innerHTML = (annualLoss * 25).toLocaleString();

  cal_draw_last_funded_amount();

};
// -- ページ読み込み時処理 -- ここまで



function roundUp(value){
  return Math.round(value * 10) / 10;
}



// 複利チャート計算・描画
let lineChart;
let labelMax = 100;
let labelList = [];
let gainList = [];
let rate = 1;
let risoku;
let totalAmount = [];
const chart = document.getElementById("lineChart");
const chart3 = document.getElementById("feeChart");
let feeList = ["0", "003", "01", "025", "050", "100", "150", "200"];
let yearList = ["3", "5", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130", "140", "150", "160", "170", "180", "190", "200"];

// Label の変更
function changeLabel() {
  labelMax = document.getElementById("labelrange").value;
  labelList = [];
  for (let i = 0; i <= labelMax; i++) {
    labelList.push(i);
  }
  changeGainList();
}

// Rate　の変更
function changeRate() {
  rate = document.getElementById("rate").value;
  changeGainList();
}

// Gain List の変更
function changeGainList() {
  var principal = Number(document.getElementById("principal").value);

  totalAmount = [principal];
  for (let i = 0; i < labelMax; i++){
    totalAmount.push(principal);
  }

  gainList = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = gainList[i] * rate;
    gainList.push(Math.round(gainList[i] + risoku));
  }


  // 手数料チャート
  scamFeeRate = rate - 0.02;
  scamFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = scamFeeGain[i] * scamFeeRate;
    scamFeeGain.push(Math.round(scamFeeGain[i] + risoku));
  }
  hedgeFeeRate = rate - 0.01;
  hedgeFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = hedgeFeeGain[i] * hedgeFeeRate;
    hedgeFeeGain.push(Math.round(hedgeFeeGain[i] + risoku));
  }
  vanFeeRate = rate - 0.001;
  vanFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = vanFeeGain[i] * vanFeeRate;
    vanFeeGain.push(Math.round(vanFeeGain[i] + risoku));
  }
  usVgFeeRate = rate - 0.0003;
  usVgFeeGain = [principal];
  for (let i = 0; i < labelMax; i++){
    risoku = usVgFeeGain[i] * usVgFeeRate;
    usVgFeeGain.push(Math.round(usVgFeeGain[i] + risoku));
  }

  changeFeeChart();
  changeBarChart();

  var lastIndex = gainList.length -1;

  var scamFee = gainList[lastIndex] - scamFeeGain[lastIndex];
  var hedgeFee = gainList[lastIndex] - hedgeFeeGain[lastIndex];
  var vangurdFee = gainList[lastIndex] - vanFeeGain[lastIndex];
  var usVgFee = gainList[lastIndex] - usVgFeeGain[lastIndex];


  document.getElementById("scamFee").innerHTML = scamFee.toLocaleString();
  document.getElementById("hedgeFee").innerHTML = hedgeFee.toLocaleString();
  document.getElementById("vanguardFee").innerHTML = vangurdFee.toLocaleString();
  document.getElementById("usVgFee").innerHTML = usVgFee.toLocaleString();
  document.getElementById("noFee").innerHTML = 0;

  document.getElementById("scamLoss").innerHTML = 100 - Math.round(scamFeeGain[lastIndex] /  gainList[lastIndex] * 100);
  document.getElementById("hedgeLoss").innerHTML = 100 - Math.round(hedgeFeeGain[lastIndex] /  gainList[lastIndex] * 100);
  document.getElementById("vanguardLoss").innerHTML = 100 - Math.round(vanFeeGain[lastIndex] /  gainList[lastIndex] * 100);
  document.getElementById("usVgLoss").innerHTML = 100 - Math.round(usVgFeeGain[lastIndex] /  gainList[lastIndex] * 100);

  document.getElementById("maturityAmount").innerHTML = gainList[
    gainList.length - 1
  ].toLocaleString();

  changeLineChart();

    // Imapact of Fee　分の手数料計算
    feeRate025 = rate - 0.0025;
    feeGain025 = [principal];
    for (let i = 0; i < labelMax; i++){
      risoku = feeGain025[i] * feeRate025;
      feeGain025.push(Math.round(feeGain025[i] + risoku));
    }
  
    feeRate050 = rate - 0.005;
    feeGain050 = [principal];
    for (let i = 0; i < labelMax; i++){
      risoku = feeGain050[i] * feeRate050;
      feeGain050.push(Math.round(feeGain050[i] + risoku));
    }
  
    feeRate150 = rate - 0.015;
    feeGain150 = [principal];
    for (let i = 0; i < labelMax; i++){
      risoku = feeGain150[i] * feeRate150;
      feeGain150.push(Math.round(feeGain150[i] + risoku));
    }

  // Imapact of Fee 表
 for (let i = 0; i < feeList.length; i++){
   var feeGainList;
   if(feeList[i]=="0"){
     feeGainList = gainList;
   }else if(feeList[i]=="003"){
     feeGainList = usVgFeeGain;
   }else if(feeList[i]=="01"){
     feeGainList = vanFeeGain;
   }else if(feeList[i]=="025"){
     feeGainList = feeGain025;
   }else if(feeList[i]=="050"){
     feeGainList = feeGain050;
   }else if(feeList[i]=="100"){
     feeGainList = hedgeFeeGain;
   }else if(feeList[i]=="150"){
     feeGainList = feeGain150;
   }else{
     feeGainList = scamFeeGain;
   }
   for(let j = 0; j < yearList.length; j++){
     if (Number(yearList[j]) <= labelMax){
       // 手数料のみ
      var perResult = 100 - Math.round(feeGainList[Number(yearList[j])] / gainList[Number (yearList[j])] * 100);
      document.getElementById(`per-${feeList[i]}-${yearList[j]}`).innerHTML = "-" + perResult + "%";
      document.getElementById(`yen-${feeList[i]}-${yearList[j]}`).innerHTML =  '<span class="money-mark">¥</span>' +  feeGainList [Number(yearList[j])].toLocaleString();

      // 手数料＋税金
    var taxPerResult = 100 - Math.round(calTax(feeGainList, principal)[Number(yearList[j])] / gainList[Number(yearList[j])] * 100);
    document.getElementById(`tax-per-${feeList[i]}-${yearList[j]}`).innerHTML = "-" + taxPerResult + "%";
    document.getElementById(`tax-yen-${feeList[i]}-${yearList[j]}`).innerHTML =  '<span class="money-mark">¥</span>'  + calTax(feeGainList, principal)[Number(yearList[j])].toLocaleString();
     }else{
      document.getElementById(`per-${feeList[i]}-${yearList[j]}`).innerHTML = "No Data ";
      document.getElementById(`yen-${feeList[i]}-${yearList[j]}`).innerHTML = "No Data ";
      document.getElementById(`tax-per-${feeList[i]}-${yearList[j]}`).innerHTML = "No Data ";
      document.getElementById(`tax-yen-${feeList[i]}-${yearList[j]}`).innerHTML = "No Data ";
     }
   }
 }
}

// LineChart　の変更
function changeLineChart() {
  if (lineChart){
    lineChart.destroy();
  }
  lineChart = new Chart(chart, {
    type: "line",
    data: {
      labels: labelList,
      datasets: [
        {
          label: "総利益 - Maturity Amount",
          data: gainList,
          borderColor: "#1AB394",
          backgroundColor: "rgba(214, 235, 226, 0.4)",
          pointborderColor: "#1AB394",
        },
        {
          label: "投資総額 - Total Investment",
          data: totalAmount,
          borderColor: "#7DB3E8",
          backgroundColor: "rgba(196, 223, 228, 0.4)",
          pointborderColor: "#7DB3E8",
        },
      ],
    },
  });
}


function changeRangeNum() {
  labelMax = document.getElementById("labelrange").value;
  document.getElementById("label-value").innerHTML = labelMax;
  document.getElementById("label-value2").innerHTML = labelMax;

  rate = document.getElementById("rate").value;
  document.getElementById("rate-value").innerHTML = roundUp(rate * 100);
  document.getElementById("rate-value2").innerHTML = roundUp(rate * 100);
}


// 手数料チャート
let feeChart;
function changeFeeChart(){
  if (feeChart){
    feeChart.destroy();
  }
  feeChart = new Chart(chart3, {
    type: "line",
    data: {
      labels: labelList,
      datasets: [
        {
          label: "手数料2%",
          data: scamFeeGain,
          fill: false,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.4)",
          pointborderColor: "red",
        },
        {
          label: "手数料1%",
          data: hedgeFeeGain,
          borderColor: "#7DB3E8",
          fill: false,
          backgroundColor: "rgba(196, 223, 228, 0.4)",
          pointborderColor: "#7DB3E8",
        },
        {
          label: "手数料0.1%",
          data: vanFeeGain,
          borderColor: "#7DB3E8",
          fill: false,
          backgroundColor: "rgba(196, 223, 228, 0.4)",
          pointborderColor: "#7DB3E8",
        },
        {
          label: "手数料0.03%",
          data: usVgFeeGain,
          fill: false,
          borderColor: "#F58023",
          backgroundColor: "rgba(245, 128, 35, 0.4)",
          pointborderColor: "#F58023",
        },
        {
          label: "手数料なし",
          data: gainList,
          fill: false,
          borderColor: "#1AB394",
          backgroundColor: "rgba(214, 235, 226, 0.4)",
          pointborderColor: "#1AB394",
        },

        // {
        //   label: "手数料0.5%",
        //   data: ,
        //   borderColor: "#1AB394",
        //   backgroundColor: "rgba(214, 235, 226, 0.4)",
        //   pointborderColor: "#1AB394",
        // },
        // {
        //   label: "手数料1%",
        //   data: ,
        //   borderColor: "#1AB394",
        //   backgroundColor: "rgba(214, 235, 226, 0.4)",
        //   pointborderColor: "#1AB394",
        // },
      ],
    },
  });
}

// ーー複利チャート計算・描画　　ここまでーー







// ーーローン・金利計算・描画ーー
// let commodityPrice = 0;
// let interestRate = 0;
// let loanMax = 50;
let totalPayment;
let pieChart;
// let totalInterest = 0;
// let paymentList = [];
let commodityPrice = 30000000;
let interestRate = 0.01;
let　interest;
let loanMax = 35;
const chart2 = document.getElementById("pieChart");


function changeInterestRate(){
  interestRate = document.getElementById("interestRate").value;
  
  changePymentList();
}

function changeLoanMax(){
  loanMax = document.getElementById("loanTerm").value;

  changePymentList();
}

function changePymentList(){
  commodityPrice = Number(document.getElementById("commodityPrice").value);
  totalPayment = commodityPrice;

  for (let i = 0; i < loanMax; i++){
    interest = totalPayment * interestRate;
    totalPayment = totalPayment + interest;
  }
  
  paymentList = [commodityPrice, totalPayment - commodityPrice];

  changePieChart();
}


function changePieChart(){
  if (pieChart){
    pieChart.destroy();
  }
  pieChart = new Chart(chart2, {
    type: "pie",
    data: {
      labels: ["商品価格", "利息総額"],
      datasets: [
        {
          backgroundColor: ["#1AB394", "#7DB3E8"],
          data: paymentList,
        },
      ],
    },
  });
}

function cgangeRngeInputNum(){
  loanMax = document.getElementById("loanTerm").value;
  document.getElementById("loanTerm-value").innerHTML = loanMax;

  interestRate = document.getElementById("interestRate").value;
  document.getElementById("interestRate-value").innerHTML = roundUp(interestRate * 100);
}

// ーーローン・金利計算・描画　　ここまでーー



// FIRE  リタイア計算
let annualLoss;

function changeRetireMoney(){
  annualLoss = Number(document.getElementById("annualLoss").value);
  document.getElementById("retireMoney").innerHTML = (annualLoss * 25).toLocaleString();
}
// --FIRE  リタイア計算    ここまでーー


// 積立投資シミュレーション
function param_check(monthly_amount = 100000, period = 20, yearly_yield = 1, last_funded_amount = 1000000) {
    if (period <= 0 || period > 300) {
        return $('.result').html('投資期間は<br class="d-inline d-sm-none">1~300の整数で入力して下さい！');
    } else if (0 > yearly_yield || yearly_yield > 99.9) {
        return $('.result').html('利回りは<br class="d-inline d-sm-none">0~99.9の数値で入力して下さい！');
    } else if (monthly_amount < 1000 || monthly_amount > 999999999) {
        return $('.result').html('毎月の投資金額は<br class="d-inline d-sm-none">1,000~9,999,999円の整数で入力して下さい！');
    } else if (last_funded_amount < 1000000 || last_funded_amount > 999999999999) {
        return $('.result').html('最終積立金額は<br class="d-inline d-sm-none">1,000,000~999,999,999円の整数で入力して下さい！');
    } else {
        return false;
    }
}

function cal_draw_last_funded_amount() {
    var period = $('#id_last_funded_period')[0].value
    var yearly_yield = $('#id_last_funded_yearly_yield')[0].value
    var monthly_amount = $('#id_last_funded_monthly_amount')[0].value
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals, last_funded_amount] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals, last_funded_amount] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('最終積立金額<br class="d-inline d-sm-none">' + last_funded_amount + '円');
        drawlinechart(periods, funded_amounts, principals, 'id_first_tab_radar_chart');
    }
}

function cal_draw_monthly_amount() {
    var period = $('#id_monthly_amount_period')[0].value
    var yearly_yield = $('#id_monthly_amount_yearly_yield')[0].value
    var last_funded_amount = $('#id_monthly_amount_last_funded_amount')[0].value
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var monthly_amount = cal_monthly_amount(period, yearly_yield, last_funded_amount);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('毎月の投資額<br class="d-inline d-sm-none">' + Math.round(monthly_amount).toLocaleString() + '円');
        drawlinechart(periods, funded_amounts, principals, 'id_second_tab_radar_chart');
    }
}

function cal_draw_period() {
    var monthly_amount = $('#id_period_monthly_amount')[0].value
    var yearly_yield = $('#id_period_yearly_yield')[0].value
    var last_funded_amount = $('#id_period_last_funded_amount')[0].value
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var period = cal_period(monthly_amount, yearly_yield, last_funded_amount);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('投資期間<br class="d-inline d-sm-none">' + Math.round(period).toLocaleString() + '年');
        drawlinechart(periods, funded_amounts, principals, 'id_third_tab_radar_chart');
    }
}

function cal_draw_yearly_yield() {
    var monthly_amount = $('#id_yearly_yield_monthly_amount')[0].value
    var period = $('#id_yearly_yield_period')[0].value
    var last_funded_amount = $('#id_yearly_yield_last_funded_amount')[0].value
    param_check(monthly_amount, period, yearly_yield, last_funded_amount)
    if (!param_check(monthly_amount, period, yearly_yield, last_funded_amount)) {
        var yearly_yield = cal_yearly_yield(monthly_amount, period, last_funded_amount);
        var windowWidth = window.innerWidth;
        if (windowWidth >= 600) {
            var [periods, funded_amounts, principals] = cal_last_funded_amount(period, yearly_yield, monthly_amount);
        }
        else {
            var [periods, funded_amounts, principals] = cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount);
        }
        $('.result').html('利回り<br class="d-inline d-sm-none">' + Math.round(yearly_yield * 10) / 10 + '%');
        drawlinechart(periods, funded_amounts, principals, 'id_forth_tab_radar_chart');
    }
}

// 初期表示：最終積立額
$('#founded-finaly-tab').click(cal_draw_last_funded_amount);

// 初期表示：毎月の積立額
$('#founded-monthly-tab').click(cal_draw_monthly_amount);

// 初期表示：積立期間
$('#founded-period-tab').click(cal_draw_period);

// 初期表示：期待利回り
$('#founded-rate-tab').click(cal_draw_yearly_yield);

// 再描画：最終積立額
$('#id_last_funded_period,#id_last_funded_yearly_yield, #id_last_funded_monthly_amount')
    .on('input', cal_draw_last_funded_amount);

// 再描画：毎月の積立額
$('#id_monthly_amount_period, #id_monthly_amount_yearly_yield, #id_monthly_amount_last_funded_amount')
    .on('input', cal_draw_monthly_amount);

// 再描画：積立期間
$('#id_period_monthly_amount, #id_period_yearly_yield, #id_period_last_funded_amount')
    .on('input', cal_draw_period);

// 再描画：期待利回り
$('#id_yearly_yield_monthly_amount, #id_yearly_yield_period, #id_yearly_yield_last_funded_amount')
    .on('input', cal_draw_yearly_yield);

// 最終積立額と各年の額を計算
function cal_last_funded_amount(period, yearly_yield, monthly_amount) {
    // 変数定義
    var [principals, periods, funded_amounts, funded_amount] = [[], [], [], 0];

    // 投資元本と期間
    for (let i = 0; i < 13; i++) {
        principals.push(Math.round(i * period * monthly_amount / 10000))
        var res = ''
        if (Math.floor(period * i / 12) != 0) {
            res = String(Math.floor(period * i / 12)) + '年'
        }
        if (Math.floor(period * i % 12) != 0) {
            res = res + String(Math.floor(period * i % 12)) + 'ヶ月'
        }
        var new_length2 = periods.push(res + '後')
    }
    // 原点の期間を削除
    periods[0] = ""

    // 積立額を計算
    for (let i = 0; i < period * 12; i++) {
        if (i % period == 0) {
            funded_amounts.push(Math.round(funded_amount / 10000));
        }
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(monthly_amount);
    }
    // 最終積立額を追加
    funded_amounts.push(Math.round(funded_amount / 10000))

    // 表示用最終積立額
    var last_funded_amount = Math.round(funded_amount).toLocaleString();

    return [periods, funded_amounts, principals, last_funded_amount];
}

// 最終積立額と各年の額を計算
function cal_last_funded_amount_mobile(period, yearly_yield, monthly_amount) {
    // 変数定義
    var [principals, periods, funded_amounts, funded_amount] = [[], [], [], 0];

    // 投資元本と期間
    for (let i = 0; i < 4; i++) {
        principals.push(Math.round(i * period * 4 * monthly_amount / 10000))
        var res = ''
        if (Math.floor(period * i / 12) != 0) {
            res = String(Math.floor(period * 4 * i / 12)) + '年'
        }
        if (Math.floor(period * i % 12) != 0) {
            res = res + String(Math.floor(period * 4 * i % 12)) + 'ヶ月'
        }
        periods.push(res + '後')
    }
    // 原点の期間を削除
    periods[0] = ""

    // 積立額を計算
    for (let i = 0; i < period * 12; i++) {
        if (i % (period * 4) == 0) {
            funded_amounts.push(Math.round(funded_amount / 10000));
        }
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(monthly_amount);
    }
    // 最終積立額を追加
    funded_amounts.push(Math.round(funded_amount / 10000))

    // 表示用最終積立額
    var last_funded_amount = Math.round(funded_amount).toLocaleString();

    return [periods, funded_amounts, principals, last_funded_amount];
}

// 最終積立額のみを計算
function cal_simple_last_funded_amount(period, yearly_yield, monthly_amount) {
    // 変数定義
    var funded_amount = 0;
    // 積立額を計算
    for (let i = 0; i < period * 12; i++) {
        funded_amount = funded_amount * (1 + yearly_yield / 1200) + Number(monthly_amount);
    }
    return funded_amount;
}

// 最大の位が1で残りは0の整数を生成
function paddingright(n) {
    var one = '1';
    for (let i = 0; i < n; i++) {
        one += '0'
    }
    return Number(one);
};

// 毎月積立額を計算
function cal_monthly_amount(period, yearly_yield, last_funded_amount) {
    if (yearly_yield == 0) {
        var init_monthly_amount = last_funded_amount / period / 12 + 0.01;
    } else {
        var init_monthly_amount = last_funded_amount / period / 12 / (1 + yearly_yield / 1200) + 0.01;
        var test_last_funded_amount = last_funded_amount;
        var max_length = String(init_monthly_amount).length;

        // 桁を落としながら収束
        var sign = 1;
        for (let i = max_length; i > 0; i--) {
            while (test_last_funded_amount * sign >= last_funded_amount * sign) {
                init_monthly_amount -= paddingright(i) * sign;
                test_last_funded_amount = cal_simple_last_funded_amount(period, yearly_yield, init_monthly_amount)
            }
            sign *= -1
        }
    }
    return init_monthly_amount;
}

// 積立期間を計算
function cal_period(monthly_amount, yearly_yield, last_funded_amount) {
    if (yearly_yield == 0) {
        var init_period = Math.round(last_funded_amount / monthly_amount / 12) + 0.01;
    } else {
        var init_period = last_funded_amount / monthly_amount / 12 / (1 + yearly_yield / 100) + 0.01;
        var test_last_funded_amount = last_funded_amount;
        var max_length = String(Math.round(init_period)).length;

        // 桁を落としながら収束
        var sign = 1;
        for (let i = max_length; i > 0; i--) {
            while (test_last_funded_amount * sign >= last_funded_amount * sign) {
                init_period -= paddingright(i) * sign;
                test_last_funded_amount = cal_simple_last_funded_amount(init_period, yearly_yield, monthly_amount)
            }
            sign *= -1
        }
        while (test_last_funded_amount * sign >= last_funded_amount * sign) {
            init_period -= 0.1 * sign;
            test_last_funded_amount = cal_simple_last_funded_amount(init_period, yearly_yield, monthly_amount)
        }
        sign *= -1
    }
    return Math.round(init_period);
}

// 毎月配当利回りを計算
function cal_yearly_yield(monthly_amount, period, last_funded_amount) {
    var init_yearly_yield = last_funded_amount / monthly_amount / period / 12 - 1 + 0.01;
    if (init_yearly_yield != 0) {
        if (init_yearly_yield > 0) {
            var sign = 1;
        } else {
            var sign = -1;
        }
        var test_last_funded_amount = last_funded_amount;
        var max_length = String(Math.round(init_yearly_yield)).length;

        // 桁を落としながら収束
        for (let i = max_length; i > 0; i--) {
            while (test_last_funded_amount * sign >= last_funded_amount * sign) {
                init_yearly_yield -= paddingright(i) * sign;
                test_last_funded_amount = cal_simple_last_funded_amount(period, init_yearly_yield, monthly_amount)
            }
            sign *= -1
        }
        while (test_last_funded_amount * sign >= last_funded_amount * sign) {
            init_yearly_yield -= 0.1 * sign;
            test_last_funded_amount = cal_simple_last_funded_amount(period, init_yearly_yield, monthly_amount)
        }
    }
    return init_yearly_yield;
}

let foundedChart;
// const foundedFinalyChart = document.getElementById("id_first_tab_radar_chart");
// const foundedMonthlyChart = document.getElementById("id_second_tab_radar_chart"); 
// const foundedPeriodChart = document.getElementById("id_third_tab_radar_chart");
// const foundedRateChart = document.getElementById("id_forth_tab_radar_chart");

function drawlinechart(periods, funded_amounts, principals, draw_chart) {
    if (foundedChart) {
        foundedChart.destroy();
    }

    // Chart.defaults.global.defaultFontSize = 14;

    // Chart.Legend.prototype.afterFit = function () {
    //     this.height = this.height + 10;
    // };
    /* idが"radar-chart"の要素を取得 */
    var ctx = document.getElementById(draw_chart).getContext('2d');
    // if (draw_chart == foundedFinalyChart) {
    //   var ctx = foundedFinalyChart;
    // } else if (draw_chart == foundedMonthlyChart) {
    //   var ctx = foundedMonthlyChart;
    // } else if (draw_chart == foundedPeriodChart) {
    //   var ctx = foundedPeriodChart;
    // } else {
    //   var ctx = foundedRateChart;
    // }

    foundedChart = new Chart(ctx, {
        // 線グラフ
        type: 'line',

        // plugins: [ChartDataLabels],

        // データセットのデータ
        data: {
            labels: periods,
            datasets: [{
                label: '積立金額',
                backgroundColor: 'rgb(255,255,255, 0)',
                borderColor: 'rgb(233,82,149)',
                data: funded_amounts,
                datalabels: {
                    color: 'rgba(233,82,149)',
                    anchor: 'end',
                    align: 225,
                }
            },
            {
                label: '投資元本',
                backgroundColor: 'rgb(255,255,255, 0)',
                borderColor: 'rgb(135,162,219)',
                data: principals,
                datalabels: {
                    color: 'rgba(135,162,219)',
                    anchor: 'start',
                    align: 125,
                }
            },
            ]
        },

        // ここに設定オプションを書きます
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'x'
            },
            plugins: {
                datalabels: {
                    formatter: function (value) {
                        if (value > 0) {
                            return value + '万円'
                        } else {
                            return null
                        }
                    },
                    align: 'left',
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        padding: 20
                    }
                }],
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '万円';
                        }
                    }
                }]
            }
        }
    });
}
// 積立投資シミュレーション　　　ここまでーー

// 税金計算 　　ここからーー
function calTax(gainsAfterFeeList, gainsPrincipal){
  var taxPer = 0.2; // 税金20%
  var afterTaxGainList = [];
  for (let i = 0; i < gainsAfterFeeList.length; i++){
    var tax = (gainsAfterFeeList[i] - gainsPrincipal) * taxPer;
    afterTaxGainList[i] = Math.round(gainsAfterFeeList[i] - tax);
  }
  return afterTaxGainList
}

// 手数料　棒グラフ
let chart4 = document.getElementById("barChart");
let barChart;
function changeBarChart(){
  console.log([gainList[gainList.length -1], usVgFeeGain[usVgFeeGain.length -1], vanFeeGain[vanFeeGain.length -1], hedgeFeeGain[hedgeFeeGain.length -1], scamFeeGain[scamFeeGain.length -1]]);
  if (barChart){
    barChart.destroy();
  }
  barChart = new Chart(chart4, {
    type: "bar",
    data: {
      labels: ["手数料なし", "0.03%", "0.1%", "1%", "2%"],
      datasets: [
        {
          data: [gainList[gainList.length -1], usVgFeeGain[usVgFeeGain.length -1], vanFeeGain[vanFeeGain.length -1], hedgeFeeGain[hedgeFeeGain.length -1], scamFeeGain[scamFeeGain.length -1]],

          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1

        
        }
      ]
    }
  })
}

let enText = {
  "moneyMark": "$",
  "compoundInterest":"Compound Interest",
  "headFukuri": "Einstein said that the greatest invention of mankind is compound interest.",
  "headFee": "Effect of trust fees (total principal and interest after trust fees are subtracted)",
  "headTax":"Total principal and interest after taxes (taxes are also a cost)",
  "headAfterTax":"Fee and Tax",
  "VTItext":"VTSAX is the only mutual fund you can buy from all mutual fund.",
  "cost":"COST",
  "fundedInvestment":"Funded Investment Simulation",
}
let jpText = {
  "moneyMark": "¥",
  "compoundInterest":"複利とは",
  "headFukuri": "アインシュタインは人類で最も偉大な発明は複利であるといった",
  "headFee": "信託手数料が及ぼす影響（信託手数料を引いた後の元利合計）",
  "headTax" :"税引き後の元利合計（税金もコストである）",
  "headAfterTax":"手数料と税金",
  "VTItext":"投資信託で買うのはこのVanguard社一択のVTSAX ",
  "cost":"コスト",
  "fundedInvestment":"積立投資シュミレーション",
}

// 多言語化
// 英語
function shiftEn(){
  document.getElementById("compoundinterst").innerHTML = enText["compoundInterest"];
  document.getElementById("head-hukuri").innerHTML = enText["headFukuri"];
  document.getElementById("head-fee").innerHTML = enText["headFee"];
  document.getElementById("head-tax").innerHTML = enText["headTax"];
  document.getElementById("head-aftertax").innerHTML = enText["headAfterTax"];
  document.getElementById("VTItext").innerHTML = enText["VTItext"];
  document.getElementById("cost").innerHTML = enText["cost"];
  document.getElementById("fundedinvestment").innerHTML = enText["fundedInvestment"];


  var moneyMarkList = document.getElementsByClassName("money-mark")
  for (let i =0; i < moneyMarkList.length; i++){
    moneyMarkList[i].innerHTML = enText["moneyMark"];
  }
}


// 日本語
function shiftJp(){
  document.getElementById("compoundinterest").innerHTML = jpText["compoundInterest"];
  document.getElementById("head-hukuri").innerHTML = jpText["headFukuri"];
  document.getElementById("head-fee").innerHTML = jpText["headFee"];
  document.getElementById("head-tax").innerHTML = jpText["headTax"];
  document.getElementById("head-aftertax").innerHTML = jpText["headAfterTax"];
  document.getElementById("VTItext").innerHTML = jpText["VTItext"];
  document.getElementById("cost").innerHTML = jpText["cost"];
  document.getElementById("fundedinvestment").innerHTML = jpText["fundedInvestment"];


  var moneyMarkList = document.getElementsByClassName("money-mark")
  for (let i =0; i < moneyMarkList.length; i++){
    moneyMarkList[i].innerHTML = jpText["moneyMark"];
  }
}