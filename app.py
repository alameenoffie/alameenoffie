from flask import Flask, request, jsonify
from openpyxl import load_workbook

app = Flask(__name__)

@app.route('/submit_debt', methods=['POST'])
def submit_debt():
    data = request.get_json()
    name = data.get('name')
    amount = data.get('amount')
    date = data.get('date')

    # مسار ملف Excel على السيرفر
    excel_path = 'received_debts.xlsx'
    
    try:
        # تحميل ملف Excel وفتح الورقة الأولى
        workbook = load_workbook(excel_path)
        sheet = workbook.active

        # أضف البيانات الجديدة إلى الصف التالي الفارغ
        sheet.append([name, amount, date])

        # احفظ التحديثات في الملف
        workbook.save(excel_path)
        
        return jsonify({"message": "تمت إضافة البيانات بنجاح!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
