from flask import Flask, jsonify,request
from flask_cors import CORS
import joblib
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from collections import OrderedDict
import re
import os
import nltk
from nltk.tokenize import sent_tokenize

app = Flask(__name__)
CORS(app)


try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

current_directory = os.getcwd()



with app.app_context():
    global tfidf_vectorizer, ensemble_model, model, tokenizer

    
    tfidf_vectorizer = joblib.load(os.path.join(current_directory, 'tfidf_vectorizer.joblib'))
    ensemble_model = joblib.load(os.path.join(current_directory, 'ensemble_model.joblib'))

    model_name = "gpt2"
    model = GPT2LMHeadModel.from_pretrained(model_name)
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# -------------------------------------------------------------------------------------
def predict(text):
    
    tfidf_input = tfidf_vectorizer.transform([text])
    result=ensemble_model.predict_proba(tfidf_input)[:,1]
   
    return result

# --------------------------------------------------------------------------------------
def calculate_perplexity(text):

    input_ids = tokenizer.encode(text, return_tensors="pt")
    perplexity = model.forward(input_ids, labels=input_ids)["loss"].exp().item()
    return perplexity

def predict2(sentence):
        results = OrderedDict()
        lines = sent_tokenize(sentence)
        Perplexity_per_line = []
        colored_sentences=[]
        for line in lines:
            ppl =calculate_perplexity(line)
            Perplexity_per_line.append(ppl)
            if ppl<=50:
               colored_sentences.append(f"<span style='background:#ffd752'>{line}</span>")  
            else:
               colored_sentences.append(line)
       
        results["Perplexity per line"] = sum(Perplexity_per_line)/len(Perplexity_per_line)
        return results["Perplexity per line"],colored_sentences
        




# -----------------------------------------------------------------------------------
@app.route('/getpredictions', methods=['POST'])
def getpredictions():
        user_input=request.get_json()
        print("predicting")
        probability=predict(user_input["data"])[0]
        probability=probability*100
        perplexity,sentences=predict2(user_input["data"])
        text= " ".join(sentences)
        res={"probab":probability,"hightext":text}
        
        return res    
        

if __name__ == '__main__':
    app.run(debug=True)