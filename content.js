//let iframe = $("button"); // Находим все теги iframe

// Проверяем атрибут. Если есть слово Youtube, то скрываем
// такой тег со страницы
//if(iframe.attr("class").split("btn").length > 1) {}

//$('body').css({'color':'red'})
//$('#page-my-index').css({'background': 'linear-gradient(149deg, rgba(24,187,156,1) 0%, rgba(106,57,175,1) 42%, rgba(187,24,148,1) 72%, rgba(115,53,134,1) 100%)', 'animation': 'gradient 10s infinite linear' , 'background-size':'400%'});

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        
        xhr.onload = () => {
            if (xhr.status == 200) {
                //   console.log(xhr.responseText);
            } else {
                console.log("Server response: ", xhr.statusText);
            }
        };

        xhr.send()
    })
}

function sendRequest2(method, url) {
    $.ajax({
        type: method,
        url: url,
        success: function (result) {
           console.log(result);
        },
        dataType: "text"
      });
}

async function getAnswerapi(url) {
    const response = await fetch(`https://pasteHereYourIp:host/api/Extension/getQuestions?id=${url}`, {
        method: 'GET'

    });

    let answerapi = await response.text();
    console.log(answerapi);
    return answerapi;
}


function saveAnswer() {
    let alldiv = document.querySelectorAll('.que.multichoice');
    let question = ' ';
    let answer = ' ';
    let id;

    for (let i = 0; i < alldiv.length; i++) {


        id = document.querySelectorAll('.que')[i].getAttribute("id");
        answer = alldiv[i].querySelector('.rightanswer').innerHTML.replace(/Правильна відповідь:/gi, '').replace(/<\/?[^>]+>/g, '').replace(/\s/g, '');
        question = alldiv[i].querySelector('.qtext').innerHTML.replace(/<\/?[^>]+>/g, '').replace(/\s/g, '')

        console.log(id)
        console.log(answer)
        console.log(question)
        sendRequest('POST', 'https://pasteHereYourIp:host/api/Extension/setQuestion?Question=' + question + '&Answer=' + answer + '&Id=' + id)
        sleep(100);
    }
}
function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}
saveAnswer();


async function getAnswer() {
    let alldiv2 = document.querySelectorAll('.que.multichoice');
    let newid;
    let answerclass;

    for (let j = 0; j < alldiv2.length; j++) {
        newid = document.querySelectorAll('.que')[j].getAttribute("id");
        const newanswer = await getAnswerapi(newid);
        // console.log(newanswer);
        answerclass = alldiv2[j].querySelectorAll('.answer');


        for (let a = 0; a < answerclass.length; a++) {
            //  console.log(answerclass[a].querySelectorAll('.ml-1'));
            let ml = answerclass[a].querySelectorAll('.ml-1');
            for (let l = 0; l < ml.length; l++) {
                //  console.log(ml[l].innerText);
                // console.log(ml[l].innerHTML.replace(/Правильна відповідь:/gi, '').replace(/<\/?[^>]+>/g, '').replace(/\s/g, ''))
                if (ml[l].innerHTML.replace(/Правильна відповідь:/gi, '').replace(/<\/?[^>]+>/g, '').replace(/\s/g, '') == newanswer) {
                    ml[l].style.backgroundColor = '#08ff87';
                    console.log("fuck yeah")
                }
            }
        }


        sleep(200);
    }
}

getAnswer();


/*
function getUser(){
   $.getJSON('https://ipapi.co/json/', function(data) {
  console.log(JSON.stringify(data, null, 2));
}); 

}
if(window.location.href == "https://b.optima-osvita.org/my/"){
    getUser();
    //console.log(window.location.href)
    let username = document.querySelector('.usertext.mr-1').innerHTML;
    console.log(username)
}
*/