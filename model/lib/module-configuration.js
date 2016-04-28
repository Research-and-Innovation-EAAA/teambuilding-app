Modules = [{
   name: "Medicine",
   steps: [
      {
         stepName: "Medicin",
         stepTemplate: "client/components/wizard/medicine/qw-medicine-01.html",
         properties: [
            "SixMP","MTX"
         ]
      }
   ],
   frontPageProperties: [
      "SixMP", "MTX"
   ]
}, {
   name: "Bloodsample",
   steps: [
      {
         stepName: "Blodprøve",
         stepTemplate: "client/components/wizard/bloodsample/qw-bloodsample-01.html"
      }
   ],
   frontPageProperties: [
      "Thrombocytter", "Hemoglobin", "Alat"
   ]
}, {
   name: "Pain",
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
}, {
   name: "Mucositis",
   steps: [
      {
         stepName: "Mundsår",
         stepTemplate: "client/components/wizard/mucositis/qw-mucositis-01.html"
      },
      {
         stepName: "Kvalme",
         stepTemplate: "client/components/wizard/mucositis/qw-mucositis-02.html"
      }
   ],
   frontPageFunction: (registration, rowNumber) => {
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
   }
}];