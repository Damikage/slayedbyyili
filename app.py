from flask import Flask, request, jsonify
import csv
import yagmail
from datetime import datetime

app = Flask(__name__)

# Endpoint to handle form submissions


@app.route("/submit", methods=["POST"])
def submit_form():
    data = request.get_json()

    # Extract form values
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Append to CSV
    with open("submissions.csv", "a", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([timestamp, name, email, message])

    # Send email notification (adjust this for your email provider)
    yag = yagmail.SMTP("your-email@example.com", "your-password")  # Replace with your email credentials
    yag.send(
        to="recipient-email@example.com",
        subject=f"New Message from {name}",
        contents=f"Name: {name}\nEmail: {email}\nMessage: {message}"
    )

    return jsonify({"message": "Data saved and email sent successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)