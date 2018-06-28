
module.exports = (vscodeEditor, selections, withTexts) => {
  if(!vscodeEditor || !selections || !withTexts) {
    return;
  }

  if(!withTexts.length || withTexts.length !== selections.length) {
    return;
  }

  vscodeEditor.edit(builder => {
    selections.forEach((selection, i) => {
      builder.replace(selection, withTexts[i].toString());
    });
  });
};
