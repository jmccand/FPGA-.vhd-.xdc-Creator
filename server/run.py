from flask import Flask

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
    return app.send_static_file('index.html')  # Return index.html from the static folder

if __name__ == '__main__':
    app.run(debug=True,port=3002)
