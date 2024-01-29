$(document).ready(function() {
  
  var timeLeft = 30;
  
  var answer = null;
  
  
  function checkTimer() {
    setTimeout(function() {
      $('#timer').html(timeLeft + ' sec left');
      if (timeLeft > 0) {
        timeLeft--;
        checkTimer();
      } else {
        handleTimeout();
      }
      
    }, 1000)
     
  }
  
  
  function handleTimeout() {
    $('#timer').removeClass('text-muted').addClass('text-danger').html('Time is over!');
    alert('Time is over!');
    
    $('#submit').attr("disabled", true);
  }
  function getQuestionIndex() {
    return Math.floor(Math.random() * 10) + 1 ;
  }
  
  $('#submit').on('click', function(e) {
    e.preventDefault();
    if (answer !== null && timeLeft > 0) {
      alert($('#answer').val() === (answer + '') ? 'Correct Answer' : 'Incorrect Answer');
    }
  })
  
  $.ajax('quiz.json').then(function(questions) {
    $('.loading').hide();
    $('#qa').show();
    var qa = questions[getQuestionIndex() - 1];
    answer = qa.answer;
    checkTimer();
    $('#question').html('<strong>#' + qa.id + '.</strong> ' + qa.question);
    $('#submit').attr("disabled", false);
    })
})