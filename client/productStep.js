Template.productStep.onCreated(function createPostLadderOnCreated() {
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
