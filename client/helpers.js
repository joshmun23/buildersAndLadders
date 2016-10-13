UI.registerHelper('lastStepIdx', function(currentStepIdx, sessionIdxName) {
  return currentStepIdx === Session.get('stepCount');
});

UI.registerHelper('firstStepIdx', function(currentStepIdx, sessionIdxName) {
  return currentStepIdx === 1;
});

UI.registerHelper('showSummaryDetails', function(currentStepIdx) {
  // TODO make this reactive
  let $contentEl = $('.content .visible');
  let result = true;

  if ($contentEl.length) {
    result = Number($contentEl.data('step')) !== Session.get('activeStep');
    debugger;
  }

  return result;
})

setSummaryDetails = function() {
  // for each step, show/hide summary details

  // for active step, hide
  $('.sa-step-ladder .title.active .summary-details').hide();

  $('.sa-step-ladder .title:not(.active) .summary-details').show();
}
