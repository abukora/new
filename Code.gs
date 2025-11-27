function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('نظام الإيجارات الزراعية')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheets()[0];
  const headers = ['الجريدة','اسم المستأجر','الناحية','السهم','القيراط','الفدان','التعديات','واضع اليد','الموقع','ملاحظات'];
  const lastRow = ws.getLastRow();
  if(lastRow < 1) ws.getRange(1,1,1,headers.length).setValues([headers]);
  if(lastRow <= 1) return [];
  const dataRange = ws.getRange(2,1,lastRow-1,headers.length);
  return dataRange.getValues();
}

function addData(record) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheets()[0].appendRow(record);
  return "تمت الإضافة بنجاح";
}

function deleteData(rowIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheets()[0].deleteRow(parseInt(rowIndex)+2);
  return "تم الحذف بنجاح";
}

function updateData(rowIndex, record) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheets()[0].getRange(parseInt(rowIndex)+2,1,1,10).setValues([record]);
  return "تم التعديل بنجاح";
}
