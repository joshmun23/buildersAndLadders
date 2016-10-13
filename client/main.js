import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var Builder = function Builder(currentAction) {
  // settings should fetch methodName, ladderType
  // this.settings = getSettings(currentAction);

  // The customer has requested this set of requirements for our Ladder
  // Even with invisible steps, the fields must be built
  this.initializeLadder = () => {
    // I'm making a new ladder
    // I'm going to need a blueprint of all the steps required
    // TODO: Which Ladder Plan are you looking for? Create Post? Create Donation?
      // Map Ladder Names to a Ladder Plan
    this.ladder = new Ladder();
    this.ladder.createBlueprint();
  }

  this.countLadderStepsInUse = () => {
    if (!this.ladder) {
      throw new Meteor.Error(404, 'Error 404: There is no Ladder');
      // Cut and paste to client belows..
      Meteor.call("methodName", function (error) {
        // identify the error
        if (error.error === "404") {
          // show a nice error message
          Session.set("errorMessage", "Please log in to post a comment.");
        }
      });
    }

    const allSteps = this.ladder.steps;
    let stepCount = 0;

    for (let i = 0; i < allSteps.length; i++) {
      if (allSteps[i].isUsed) {
        stepCount++;
      }
    }

    return stepCount;
  }

  this.shipLadder = () => {
    // Send it off to the Customer
  }

  this.build = () => {
    //
  }
};

var Ladder = function Ladder() {
  // TODO: Render requirements from User/Site CCPF
  // allow users to have customized configurations for their Create Post Ladder
  this.requirements = {
    section: {
      order: [0,1,2,3],
      list: [
        {
          "sectionNum" : 0,
          "sectionName" : "Product",
          "useSection" : true,
          "controls" : [
            {
              "controlName" : "itemNumber",
              "controlNum" : 0,
              "defaultValue" : "",
              "useControl" : true
            },
            {
              "controlName" : "foodType",
              "controlNum" : 1,
              "defaultValue" : "",
              "useControl" : false
            }
          ]
        },
        {
          "sectionNum" : 1,
          "sectionName" : "Price & Value",
          "useSection" : true,
          "controls" : [
            {
              "controlName" : "sellPrice",
              "controlNum" : 4,
              "defaultValue" : "0",
              "useControl" : false
            },
          ]
        },
        {
          "sectionNum" : 2,
          "sectionName" : "Logistics",
          "useSection" : true,
          "controls" : [
            {
              "controlName" : "delivery",
              "controlNum" : 0,
              "defaultValue" : "pick up",
              "useControl" : false
            }
          ]
        },
        {
          "sectionNum" : 3,
          "sectionName" : "Audience",
          "useSection" : true,
          "controls" : [
            {
              "controlName" : "sendTo",
              "controlNum" : 0,
              "defaultValue" : "my sites",
              "useControl" : false
            },
          ]
        }
      ]
    },
  };

  // initialize empty steps
  this.steps = [];

  // a blueprint is an ordered list of helper sections for a form
  this.createBlueprint = () => {
    // returns a set of Steps
    // check requirements
    if (!this.requirements) {
      // set flags
    }

    let result = [];

    const requirementSection = this.requirements.section,
          requirementSectionList = requirementSection.list,
          requirementSectionOrder = requirementSection.order;

    // steppers gui index
    let stepIdx = 1;

    for (let i = 0; i < requirementSectionOrder.length; i++) {
      // index used to fetch the section to be rendered
      let currentSectionIdx = requirementSectionOrder[i],
      // section requirements
          currentSection = requirementSectionList[currentSectionIdx],
      // step helper for view
          currentStep = new Step(currentSection);

      // assign step numbers for steps in use
      if (currentStep.isUsed) {
        currentStep.stepIdx = stepIdx;
        stepIdx++;
      }

      result.push(currentStep);
    }

    // set steps for validations and submission
    this.steps = result;
    return result;
  };

  this.isValid = false;
};

var stepNameToTemplateName = {
  Product: 'productStep',
  'Price & Value': 'priceAndValueStep',
  Logistics: 'logisticsStep',
  Audience: 'audienceStep'
}

var setStepFields = function(formName, sectionName) {
  let formNames = {};

  formNames['Create Post Marketplace'] = {

  }
}

// extendStepFieldsByFormName = {
//   'Create Post Marketplace': function() {
//     this.validations = [
//       // section 0
//       {
//         itemNumber: '',
//         foodType: '',
//         description: ''
//       },
//       // section 1
//       {
//         itemNumber: '',
//         foodType: ''
//       },
//       // section 2
//       {
//         itemNumber: '',
//         foodType: ''
//       },
//       // section 3
//       {
//         itemNumber: '',
//         foodType: ''
//       }
//     ];

//     this.validateSection: function(sectionNo) {
//       // sectionNo references the section number from the requirements
//       // we are not using stepIdx because it is not a persisted index

//       return this.validations[sectionNo];
//     }

//     this.validateField: function(fieldName) {
//       return this.validations[sectionNo][fieldName];
//     }
//   }
// }

var Step = function Step(currentSection, stepIdx=null) {
  // Step indices are only assigned if the Step will be visible in the GUI
  this.stepIdx = stepIdx;
  this.sectionIdx = currentSection.sectionNum;
  this.isUsed = currentSection.useSection;
  this.displayName = currentSection.sectionName;
  // fetch template name for dynamic template rendering
  this.templateName = stepNameToTemplateName[currentSection.sectionName];
  this.fields = currentSection.controls;

  // let's extend our currentStep to include a Field Object,
  // which contains all the details we'll need to complete our form
  // _.extend(currentStep, setStepFields[currentStep.sectionName]);

  this.isValid = () => {
    // TODO: fetch validation
    return true;
  }
}

var Field = function Field() {
  this.fields = {
    createPostMarketplace: [
      fieldName
    ],
    createSelfReportedDonation: [
    ]
  }
}

Template.createPostLadder.onCreated(function createPostLadderOnCreated() {
  // a wild Builder appears
  this.Builder = new Builder();

  // Builder starts creating ladder
  this.Builder.initializeLadder();

  // need session variable, parent template context not found on dynamic templates
  // used for: determining which action(continue/previous) buttons to show
  Session.setDefault('stepCount', 0);
  Session.setDefault('activeStep', 1);

  const allSteps = this.Builder.ladder.steps;
  let stepCount = this.Builder.countLadderStepsInUse();

  Session.set('stepCount', stepCount);
});

Template.createPostLadder.onRendered(function createPostLadderOnRendered() {
  // initialize accordion
  this.autorun(() => {
    let that = this;
    this.$('.sa-step-ladder.ui.accordion')
      .accordion({
        // setting for one or more steps allowed to be active
        exclusive: true
      })
    ;
  });
});

Template.createPostLadder.onDestroyed(function createPostLadderOnRendered() {
  // initialize accordion
  Session.set('stepCount', null);
});

Template.createPostLadder.helpers({
  ladderName() {
    return 'Create Post Marketplace';
  },
  // initialize data for steps
  ladderSteps() {
    return Template.instance().Builder.ladder.steps;
  },
  // display and submit status for Create Post
  canBuildLadder() {
    // check to see if Ladder isValid
    // return Template.instance().Builder.ladder.isValid;
    return true;
  },
  stepCount() {
    // tie index to viewed sections
    // return i++;
  }
});

Template.createPostLadder.events({
  // set button events
  'click .sa-step-ladder button.continue'(e, t) {
    // TODO: Add isValid check
    let $contentEl = t.$(e.target).closest('.content');
    let sectionNo = $contentEl.data('section');
    let stepNo = $contentEl.data('step');
    let isValid = t.Builder.ladder.steps[sectionNo].isValid();

    if (isValid) {
      const nextStep = Number(stepNo) + 1;
      t.$(`.title[data-step=${String(stepNo)}]`).trigger('click');
      t.$(`.title[data-step=${String(nextStep)}]:not(.active)`).trigger('click');
      // $(`.title[data-step="${stepNo}"] .summary-details`).show();
      // Session.set('activeStep', nextStep);
    } else {
      e.stopImmediatePropagation();
      return false;
    }
  },
  'click .sa-step-ladder button.previous'(e, t) {
    // TODO: Add isValid check
    let $contentEl = t.$(e.target).closest('.content');
    let sectionNo = $contentEl.data('section');
    let stepNo = $contentEl.data('step');
    let isValid = t.Builder.ladder.steps[sectionNo].isValid();

    if (isValid) {
      const nextStep = Number(stepNo) - 1;
      t.$(`.title[data-step=${String(stepNo)}]`).trigger('click');
      t.$(`.title[data-step=${String(nextStep)}]:not(.active)`).trigger('click');

      // Session.set('activeStep');
      // $(`.title[data-step="${stepNo}"] .summary-details`).show();
      // Session.set('activeStep', nextStep);
    } else {
      e.stopImmediatePropagation();
      return false;
    }
  },
  // set button events
  'click .sa-step-ladder .title'(e, t) {
    // TODO: Add isValid check
    let $titleEl = t.$(e.target).closest('.title');
    let sectionNo = $titleEl.data('section');
    let stepNo = $titleEl.data('step');
    let isValid = t.Builder.ladder.steps[sectionNo].isValid();

    if (isValid) {
      // const nextStep = Number(stepNo) + 1;
      // t.$(`.title[data-step=${String(nextStep)}]`).trigger('click');
    } else {
      $titleEl.stop();
      e.stopImmediatePropagation();
      return false;
    }
  },
  'click .sa-step-ladder .content'(e, t) {
    debugger;
  }
});
