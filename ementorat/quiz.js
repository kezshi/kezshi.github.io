(function() 
 {
  var allQuestions = [{
    question: "Le programme suivant fait-il appel au machine learning: utilisé dans les appareils photos, l’algorithme de reconnaissance de visage, en détectant la forme du visage: deux yeux, un nez, une bouche, etc.",
    options: ["Oui", "Non"],
    answer: 1
  }, {
    question: "Le programme suivant fait-il appel au machine learning: un sèche-linge qui détecte l’humidité dans le tambour de séchage pour prolonger le temps de séchage",
    options: ["Oui", "Non"],
    answer: 1
  },{
    question: "Le programme suivant fait-il appel au machine learning: La saisie vocale qui permet de transcrire le texte par rapport à la voix",
    options: ["Oui", "Non"],
    answer: 0
  },{
    question: "Pour créer des algorithmes de machine learning, on n’a pas besoin de données, on peut directement transférer la connaissance des humains aux machines",
    options: ["Vrai", "Faux"],
    answer: 1
  },{
    question: "Estimer le prix de vente d’un véhicule: de quel type d'algorithme il s’agit pour ce cas d’application ?",
    options: ["Apprentissage supervisé", "Classfication","Apprentissage non-supervisé","Clustering"],
    answer: 0
  },{
    question: "Selon les notations ci-dessus, on a PP=VP+VN ?",
    options: ["Vrai", "Faux"],
    answer: 1
  },{
    question: "Comment la justesse est-elle calculée ?",
    options: ["(VP+FP) / T", "(VP+VN) / T","VP / PP","FP / PP"],
    answer: 1
  },{
    question: "Dans le cas de détection de spams, quelle métrique doit-on privilégier?",
    options: ["Précision", "Rappel"],
    answer: 0
  },{
    question: "Comment la précision est-elle calculée ?",
    options: ["VP / PP", "VN / RP","VP / RP","VN / PP"],
    answer: 0
  },{
    question: "Comment la rappel est-elle calculée ?",
    options: ["VP / PP", "VN / RP","VP / RP","VN / PP"],
    answer: 2
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Merci de sélectionner une réponse');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append(' Votre score est de  ' + correct + ' sur ' +allQuestions.length);
        return score;
  }
})();