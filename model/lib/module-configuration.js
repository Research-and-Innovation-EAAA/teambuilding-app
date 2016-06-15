Modules = [

   //Medicine module
   {
      name: "Medicine",
      wizard: {
         steps: [
            {
               stepName: "Medicin",
               stepTemplate: "client/components/wizard/medicine/qw-medicine-01.html",
               validation: (registration) => {
                  return (registration.SixMP !== undefined) && (registration.MTX !== undefined);
               }
            }
         ]
      },
      frontPage: {
         properties: [
            "SixMP", "MTX"
         ],
         propertyDescription: [
            "6 MP", "MTX"
         ],
         propertyMeasurement: [
            "mg / daglig", "mg / ugentlig"
         ],
         iconUrl: "/medicintransparent.png",
         barClass: "bar-calm"
      }
   },

   //Bloodsample module
   {
      name: "Bloodsample",
      wizard: {
         steps: [
            {
               stepName: "Blodprøve",
               stepTemplate: "client/components/wizard/bloodsample/qw-bloodsample-01.html",
               validation: (registration) => {
                  var isValid = true;
                  for (var property in registration) {
                     if (property === "_id" ||
                        property === 'timestamp' ||
                        property === 'createdBy' ||
                        property === 'createdAt')
                        continue;

                     var bloodsample = registration[property];
                     if (bloodsample != null) {
                        isValid = 0 <= parseFloat(bloodsample);
                        if (!isValid) {
                           //invalid data
                           console.log('Data is invalid at property ', property, '. Value is ', bloodsample);
                           return isValid;
                        }
                     }
                  }
                  return isValid;
               }
            }
         ]
      },
      frontPage: {
         properties: [
            "Thrombocytter", "Hemoglobin", "Alat"
         ],
         propertyDescription: [
            "Thombocytter", "Hæmoglobin", "ALAT"
         ],
         propertyMeasurement: [
            "10^9 L", "mmol / L", "U / L"
         ],
         iconUrl: "/blodtransparent.png",
         barClass: "bar-assertive"
      }
   },

   //Pain module
   {
      name: "Pain",
      wizard: {
         steps: [
            {
               stepName: "Morfin",
               stepTemplate: "client/components/wizard/pain/qw-pain-01.html",
               validation: (registration) => {
                  var isValidMorphine = true;
                  console.log('registration.morphineType: ', registration.morphineType);
                  if (registration.morphineType !== undefined) { //if there is a selected morphine type
                     // check there is valid dose
                     console.log(registration.morphineDose);
                     if (registration.morphineDose === undefined || registration.morphineDose == null || registration.morphineDose < 0)
                        isValidMorphine = false;
                  } else { //if there is no selected morphine type
                     // check if there is valid dose
                     // to avoid confusion, if there is valid dose but no valid type do not validate until type is chosen or dose deleted
                     console.log('registration.morphineDose: ', registration.morphineDose, 'when registration.morphineType === undefined');
                     if (registration.morphineDose != null) {
                        isValidMorphine = false;
                     }
                  }
                  return isValidMorphine;
               }
            },
            {
               stepName: "Type",
               stepTemplate: {
                  url: "client/components/wizard/templates/simple-question.html",
                  config: {
                     propertyName: "painType",
                     question: "Hvor er smerten?",
                     answers: ["Mave", "Ben", "Arme", "Hoved", "Andet"]
                  }
               },
               validation: (registration) => {
                  return registration.painType !== undefined;
               }
            },
            {
               stepName: "Styrke",
               stepTemplate: "client/components/wizard/pain/qw-pain-03.html",
               validation: (registration) => {
                  var isValid;
                  if (registration.flaccvalue != null) {
                     isValid = registration.flaccvalue[0] != null &&
                        registration.flaccvalue[1] != null &&
                        registration.flaccvalue[2] != null &&
                        registration.flaccvalue[3] != null &&
                        registration.flaccvalue[4] != null;
                  } else {
                     isValid = registration.painScore != null;
                  }
                  return isValid;
               }
            }
         ]
      },
      frontPage: {
         propertyFunction: (registration, rowNumber) => {
            var message = 'Ingen data';
            if (registration === undefined)
               return message;

            switch (rowNumber) {
               case 0:
                  message = registration.painType;
                  message = message.charAt(0).toUpperCase() + message.slice(1);
                  break;
               case 1:
                  message = registration.painScore;
                  break;
               case 2:
                  if (registration.morphineDose !== undefined && registration.morphineDose > 0) {
                     message = registration.morphineDose;
                     if (registration.morphineMeasureUnit !== undefined) {
                        message += "  " + registration.morphineMeasureUnit;
                     }
                  }
                  else
                     message = 'Ingen morfin';
                  break;
            }
            return message;
         },
         propertyDescription: [
            "Smerte typen", "Intensitet", "Morfin"
         ],
         iconUrl: "/smertetransparent.png",
         barClass: "bar-balanced"
      }
   },

   //Mucositis module
   {
      name: "Mucositis",
      wizard: {
         steps: [
            {
               stepName: "Mundsår",
               stepTemplate: "client/components/wizard/mucositis/qw-mucositis-01.html",
               validation: (registration) => {
                  var isValid = true;
                  for (i = 0; i < 3; i++) {
                     if (registration.diagnosis[i] === undefined) {
                        isValid = false;
                        break;
                     }
                  }
                  return isValid;
               }
            },
            {
               stepName: "Kvalme",
               stepTemplate: "client/components/wizard/mucositis/qw-mucositis-02.html",
               validation: (registration) => {
                  return (registration.nauseaScore >= 0) && (registration.nauseaScore <= 10);
               }
            }
         ]
      },
      frontPage: {
         propertyFunction: (registration, rowNumber) => {
            var message = 'Ingen data';
            if (registration === undefined)
               return message;

            var diagnosis;
            switch (rowNumber) {
               case 0:
                  diagnosis = registration.diagnosis[rowNumber];
                  if (diagnosis === 0) {
                     message = "Ingen smerter"
                  }
                  else if (diagnosis === 1) {
                     message = "Lette smerter"
                  }
                  else if (diagnosis === 2) {
                     message = "Moderate smerter"
                  }
                  else if (diagnosis === 3) {
                     message = "Kraftige smerter"
                  }
                  else if (diagnosis === 4) {
                     message = "Uudholdlige smerter"
                  }
                  break;
               case 1:
                  diagnosis = registration.diagnosis[rowNumber];
                  if (diagnosis === 0) {
                     message = "Ingen sår"
                  }
                  else if (diagnosis === 1) {
                     message = "Ingen sår, let rødmen"
                  }
                  else if (diagnosis === 2) {
                     message = "Enkelte mindre sår"
                  }
                  else if (diagnosis === 3) {
                     message = "Mange sår"
                  }
                  else if (diagnosis === 4) {
                     message = "Udtalt rødmen + mange store sår"
                  }
                  break;
               case 2:
                  diagnosis = registration.diagnosis[rowNumber];
                  if (diagnosis === 0) {
                     message = "Ingen påvirkning"
                  }
                  else if (diagnosis === 1) {
                     message = "Spiser næsten normalt"
                  }
                  else if (diagnosis === 2) {
                     message = "Spiser lidt fast føde"
                  }
                  else if (diagnosis === 3) {
                     message = "Spiser flydende føde"
                  }
                  else if (diagnosis === 4) {
                     message = "Behov for sondemad"
                  }
                  break;
            }
            return message;
         },
         propertyDescription: [
            "Smerte", "Sår/Rødme", "Fødeindtag"
         ],
         iconUrl: "/mucositistransparent.png",
         barClass: "bar-energized"
      }
   },

   //Arthritis pain module
   {
      name: "Arthritis Pain",
      wizard: {
         steps: [
            {
               stepName: "Smerte",
               stepTemplate: {
                  url: "client/components/wizard/templates/pain-scale-slider.html",
                  config: {
                     propertyName: "painScore",
                     minValue: 0,
                     maxValue: 10,
                     step: 0.5
                  }
               },
               validation: (registration) => {
                  return registration.painScore !== undefined;
               }
            }
         ]
      },
      frontPage: {
         properties: [
            "painScore"
         ],
         propertyDescription: [
            "Intensitet"
         ],
         iconUrl: "/smertetransparent.png",
         barClass: "bar-royal"
      }
   }
];