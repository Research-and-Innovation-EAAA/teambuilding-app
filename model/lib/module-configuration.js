Modules = [

   //Medicine module
   {
      name: "Medicine",
      wizard: {
         steps: [
            {
               stepName: "Medicin",
               stepTemplate: "client/components/wizard/medicine/qw-medicine-01.html",
               properties: [
                  "SixMP", "MTX"
               ]
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
               stepTemplate: "client/components/wizard/bloodsample/qw-bloodsample-01.html"
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
               stepTemplate: "client/components/wizard/pain/qw-pain-01.html"
            },
            {
               stepName: "Type",
               stepTemplate: "client/components/wizard/pain/qw-pain-02.html"
            },
            {
               stepName: "Styrke",
               stepTemplate: "client/components/wizard/pain/qw-pain-03.html"
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
               stepTemplate: "client/components/wizard/mucositis/qw-mucositis-01.html"
            },
            {
               stepName: "Kvalme",
               stepTemplate: "client/components/wizard/mucositis/qw-mucositis-02.html"
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

   }
];