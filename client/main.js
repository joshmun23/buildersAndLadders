import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var Builder = function Builder(currentAction) {
  // settings should fetch methodName, ladderType
  // this.settings = getSettings(currentAction);

  // The customer has requested this set of requirements for our Ladder
  // Even with invisible steps, the fields must be built
  this.ladder = new Ladder();

  this.build = () => {
    // this.ladder
  }
};

var Ladder = function Ladder() {
  // TODO: Render requirements from User/Site CCPF
  // allow users to have customized configurations for their Create Post Ladder
  this.requirements = {
    section: {
      order: [1,0,2,3],
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
          "useSection" : false,
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
  this.blueprint = () => {
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

var Step = function Step(currentSection, stepIdx=null) {
  this.stepIdx = stepIdx;
  this.isUsed = currentSection.useSection;
  this.displayName = currentSection.sectionName;
  this.templateName = 'productStep';
  this.fields = currentSection.controls;
}

Template.createPostLadder.onCreated(function createPostLadderOnCreated() {
  // counter starts at 0
  this.Builder = new Builder();
});

Template.createPostLadder.helpers({
  ladderName() {
    return 'Create Post Marketplace';
  },
  ladderSteps() {
    let ladderSteps = Template.instance().Builder.ladder.blueprint();

    return ladderSteps;
  },
  canBuildLadder() {
    // check to see if Ladder isValid
    return Template.instance().Builder.ladder.isValid;
  },
  stepCount() {
    // tie index to viewed sections
    // return i++;
  }
});

Template.createPostLadder.events({
});

Template.productStep.onCreated(function createPostLadderOnCreated() {
  debugger;
});

Template.productStep.helpers({
  description(e, t) {
    return {
      type: 'text',
      name: 'Description',
      class: ''
    }
  },
  displayName() {
    debugger;
    // return Template.instance()
  }
});

Template.productStep.events({
  'change .product-step-field'(e, t) {
    debugger;
  }
});
