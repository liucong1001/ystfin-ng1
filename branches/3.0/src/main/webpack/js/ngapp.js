/**
 * Created by 扬 on 2016/9/29.
 */
require("../css/bootstrap.css")
require("../css/elements.css")
require("../css/theme.css")
require("../css/iconfont.css")
require("../css/main.css")
require("../css/ui.css")


require("./controller/pay/createOrder")
require("./controller/pay/queryOrder")
require("./controller/pay/pay")
require("./controller/icard/bind")
require("./controller/icard/recharge")
require("./controller/batch/inStep1")
require("./controller/batch/inStep2")
require("./controller/trans/sellerStep0")
require("./controller/trans/sellerStep1")
require("./controller/trans/sellerStep2")
require("./controller/trans/sellerQuery")
require("./controller/trans/sellerReview")
//require("./controller/test/oss")
require("./controller/batch/inStep3")
require("./controller/batch/inStep4")
require("./controller/icard/details")
require("./controller/icard/account")

// 财务
require("./controller/finance/print/print")
require("./controller/finance/print/printSuccess")
require("./controller/finance/print/remove")

//交易查询
require("./controller/trans/query")

//用户管理
require("./controller/system/manager/manager")
require("./controller/system/manager/managerform")
require("./controller/system/manager/managerinfo")

//档案所在地管理
require("./controller/system/transferCity/transferCity")
require("./controller/system/transferCity/transferCityform")
require("./controller/system/transferCity/transferCityinfo")
require("./controller/system/transferCity/transcityService")
require("./controller/system/transferCity/addCity")
require("./controller/system/transferCity/addCityModify")


//代码管理
require("./controller/system/code/code")
require("./controller/system/code/form")
require("./controller/system/code/codeInfo")
require("./controller/system/code/codeService")
require("./controller/system/code/addCode")
//require("./controller/system/code/addCodeModify")
require("./controller/system/code/addCodeModify")

//修改左侧菜单项
require("./controller/system/modify/modify")
require("./controller/system/modify/modifyinfo")
require("./controller/system/modify/modifyform")
require("./controller/system/modify/role")
require("./controller/system/modify/roleinfo")
require("./controller/system/modify/roleform")
//绩效考核
require("./controller/system/kpi/kpi")

//提档地（trans）
require("./controller/trans/page")
require("./controller/trans/archivesArrive")
require("./controller/trans/archivesSign")








