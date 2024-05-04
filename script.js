const summarizeInput = () => {
    document.getElementById("textAreaExample2").color = "black";

    let summarizeButton = document.getElementById("summarizeInput");
    let inputText = document.getElementById("textAreaSummarize").value;
    let summarizedResult = ""
    // console.log(inputText)

    // While data is processed, user cannot click Summarize and the button text become
    // Loading...
    summarizeButton.value = "Loading...";
    summarizeButton.disabled = true;


    // Send the inputText to the server using fetch
    fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"payload": inputText})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Summary:', data);

        summarizedResult = data.processed_data.replace("summarize: ", "");

        document.getElementById("textAreaExample2").value = summarizedResult;

        // Result word count
        wordCounter('textAreaExample2', 'resultCount');

        summarizeButton.value = "Summarize";
        summarizeButton.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("textAreaExample2").value = "Something went wrong";
        document.getElementById("textAreaExample2").color = "red";
        summarizeButton.value = "Summarize";
        summarizeButton.disabled = false;

        // Result word count
        wordCounter('textAreaExample2', 'resultCount');
    });
}

const deleteInputText = () => {
    document.getElementById("textAreaSummarize").value = "";
    // console.log("debug");
    wordCounter('textAreaSummarize', 'inputCount');
}

const giveParagraph = () => {
    document.getElementById("textAreaSummarize").value = "The Ming dynasty's founder, the Hongwu Emperor (1368–1398), attempted to create a society of self-sufficient rural communities ordered in a rigid, immobile system that would guarantee and support a permanent class of soldiers for his dynasty: the empire's standing army exceeded one million troops and the navy's dockyards in Nanjing were the largest in the world. He also took great care breaking the power of the court eunuchs and unrelated magnates, enfeoffing his many sons throughout China and attempting to guide these princes through the Huang-Ming Zuxun, a set of published dynastic instructions. This failed when his teenage successor, the Jianwen Emperor, attempted to curtail his uncles' power, prompting the Jingnan campaign, an uprising that placed the Prince of Yan upon the throne as the Yongle Emperor in 1402. The Yongle Emperor established Yan as a secondary capital and renamed it Beijing, constructed the Forbidden City, and restored the Grand Canal and the primacy of the imperial examinations in official appointments. He rewarded his eunuch supporters and employed them as a counterweight against the Confucian scholar-bureaucrats. One eunuch, Zheng He, led seven enormous voyages of exploration into the Indian Ocean as far as Arabia and the eastern coasts of Africa. Hongwu and Yongle emperors had also expanded the empire's rule into Inner Asia.";
    // console.log("debug");
    wordCounter('textAreaSummarize', 'inputCount');
}

const copyResult = () => {
    let element = document.getElementById("textAreaExample2")

    element.select();
    element.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(element.placeholder);

    // Alert the copied text
    alert("Copied the result!");
}

const wordCounter = (inputID, outputID) => {
    let str = document.getElementById(inputID).value;
    let array = []

    if(str.length > 0){
        array = str.trim().split(/\s+/);
    }else{
        array = [];
    }

    document.getElementById(outputID).innerText = `${array.length} Word(s)`;
    // console.log("debug")
}