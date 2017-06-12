ModuleTemplates = {
    shortEvent: {
        "name": "Feedback",
        "number": 1,
        "eventId": "XXX",
        "startTime": "YYY",
        "endTime": "ZZZ",
        "wizard": {
            "steps": [
                {
                    "stepName": "Profil",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/multiple-questions.html",
                        "config": {
                            "questions": [
                                {
                                    "propertyName": "interview",
                                    "question": "Må en medarbejder fra Erhvervsakademi Aarhus kontakte dig senere for at gennemføre et kort interview?",
                                    "answers": [
                                        "Ja",
                                        "Nej"
                                    ]
                                },
                                {
                                    "propertyName": "alder",
                                    "question": "Alder",
                                    "answers": [
                                        "-20",
                                        "21-30",
                                        "31-40",
                                        "41-50",
                                        "51-60",
                                        "61-"
                                    ]
                                },
                                {
                                    "propertyName": "koen",
                                    "question": "Køn",
                                    "answers": [
                                        "mand",
                                        "kvinde"
                                    ]
                                },
                                {
                                    "propertyName": "anciennitet",
                                    "question": "Hvor længe har du været ansat på din nuværende arbejdsplads?",
                                    "answers": [
                                        "Op til 1 år",
                                        "Fra 1 år til 3 år",
                                        "Fra 3 år til 5 år",
                                        "Fra 5 år til 8 år",
                                        "Mere end 8 år"
                                    ]
                                }
                            ],
                            "mandatory": true
                        }
                    }
                },
                {
                    "stepName": "m1q2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad var din generelle holdning til teambuilding før dagens forløb?",
                            "propertyName": "m1q2",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "Overvejende positiv",
                            "negativeText": "Overvejende negativ",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad har du lært nogle af dine kollegaer bedre at kende i dag?",
                            "propertyName": "m1q3",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "I meget høj grad",
                            "negativeText": "I meget lav grad",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad tror du, at du vil opleve et bedre samarbejde på din arbejdsplads efter dagens forløb?",
                            "propertyName": "m1q4",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "I meget høj grad",
                            "negativeText": "I meget lav grad",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad er du tilfreds med den måde I løste dagens udfordringer?",
                            "propertyName": "m1q5",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "I meget høj grad",
                            "negativeText": "I meget lav grad",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad kan dele af dagens aktiviteter overføres til udfordringer på din arbejdsplads?",
                            "propertyName": "m1q6",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "I meget høj grad",
                            "negativeText": "I meget lav grad",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad oplevede du i dag at der var en eller flere der tog ledelse?",
                            "propertyName": "m1q7",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "I meget høj grad",
                            "negativeText": "I meget lav grad",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad er du tilfreds med jeres engagement i dagens forløb?",
                            "propertyName": "m1q8",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "I meget høj grad",
                            "negativeText": "I meget lav grad",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvordan er din holdning til jeres samarbejde i dag?",
                            "propertyName": "m1q9",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "Overvejende positiv",
                            "negativeText": "Overvejende negativ",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvordan er din holdning til din egen indsats i dag?",
                            "propertyName": "m1q10",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "Ovejvejende positiv",
                            "negativeText": "Overvejende negativ",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q11",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Efter dagens forløb hvad er din generelle vurdering af dagen?",
                            "propertyName": "m1q11",
                            "minValue": 1,
                            "maxValue": 7,
                            "step": 1,
                            "defaultValue": 1,
                            "mandatory": true,
                            "positiveText": "Overvejende positiv",
                            "negativeText": "Overvejende negativ",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q12",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/text-input.html",
                        "config": {
                            "question": "Hvad har været det bedste ved dagens forløb og hvorfor?",
                            "propertyName": "m1q12",
                            "mandatory": false
                        }
                    }
                }

            ]
        }
    },

    longEventBefore: {
        "name": "Før",
        "number": 1,
        "eventId": "XXX",
        "startTime": "YYY",
        "endTime": "ZZZ",
        "wizard": {
            "steps": [
                {
                    "stepName": "m1q1",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Arbejder du normalt alene eller i et team?",
                            "propertyName": ",m1q1",
                            "minValue": 1,
                            "maxValue": 5,
                            "step": 1,
                            "defaultValue": 3,
                            "mandatory": true,
                            "positiveText": "Næsten altid i et team",
                            "negativeText": "Næsten altid alene",
                            "smiley": false
                        }
                    }
                },
                {
                    "stepName": "m1q2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q2",
                            "question": "Jobprofil",
                            "answers": [
                                "Ledelsesansvar for mere end 5 personer",
                                "Ledelsesansvar for 1 til 5 personer",
                                "Ingen ledelsesansvar"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad er din generelle holdning til teambuilding?",
                            "propertyName": "m1q3",
                            "minValue": 1,
                            "maxValue": 5,
                            "step": 1,
                            "defaultValue": 3,
                            "mandatory": true,
                            "positiveText": "positiv",
                            "negativeText": "negativ",
                            "smiley": true
                        }
                    }
                },
                {
                    "stepName": "m1q4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q4",
                            "question": "På din arbejdsplads er I åbne om jeres svagheder?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q5",
                            "question": "På din arbejdsplads er I gode til at give hinanden en undskyldning?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q6",
                            "question": "På din arbejdsplads er I åbne og oprigtige over for hinanden?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q7",
                            "question": "På din arbejdsplads hjælper I hinanden og søger input vedrørende hinandens arbejdsområder?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q8",
                            "question": "På din arbejdsplads fremfører folk deres meninger, også selvom det medfører risiko for uenighed?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q9",
                            "question": "Under møder bliver alle meninger og holdninger inddraget?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q10",
                            "question": "Når der opstår en konflikt i afdelingen, håndteres den med det samme.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q11",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q11",
                            "question": "På team/afdelingsmøder diskuteres de vigtigste og vanskelige problemstillinger.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q12",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q12",
                            "question": "Min afdeling/teamet er klar over vores overordnede retning og prioriteter.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q13",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q13",
                            "question": "Afdelings/teammøder afslutter diskussioner med klare og specifikke løsninger og handlingspunkter.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q14",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q14",
                            "question": "Efter møder forlader alle møderne fulde af tillid og alle bakker op om de beslutninger der er truffet.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q15",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q15",
                            "question": "Folk i min afdeling bakker op om de trufne beslutninger, også selvom de ikke er enige som udgangspunkt.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q16",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q16",
                            "question": "På min arbejdsplads giver vi hinanden spontan, konstruktiv feedback.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q17",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q17",
                            "question": "Vi sikrer, at alle føler et pres og at der er en forventning om at alle præsterer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q18",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q18",
                            "question": "Vi konfronterer kollegaer med problemer inden for deres respektive ansvarsområder.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q19",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q19",
                            "question": "Kollegaerne stiller spørgsmål til hinanden om deres aktuelle tilgang og metoder.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q20",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q20",
                            "question": "Teamet/arbejdsgruppen sætter teamets succes over individuelle præsentationer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q21",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q21",
                            "question": "Vi er villige til at bringe ofre på egne områder for teamets/afdelings skyld.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q22",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q22",
                            "question": "Hvis vi ikke når vores fælles mål, tager alle et personligt ansvar for at forbedre afdelingens/teamets præsentationer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m1q23",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m1q23",
                            "question": "Vi er hurtige til at fremhæve andres bidrag og præsentationer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                }
            ]
        }
    },

    longEventDuring: {
        "name": "Under",
        "number": 2,
        "eventId": "XXX",
        "startTime": "YYY",
        "endTime": "ZZZ",
        "wizard": {
            "steps": [
                {
                    "stepName": "m2q1",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad er din generelle holdning til teambuilding?",
                            "propertyName": "m2q1",
                            "minValue": 1,
                            "maxValue": 5,
                            "defaultValue": 3,
                            "step": 1,
                            "mandatory": true,
                            "positiveText": "positiv",
                            "negativeText": "negativ",
                            "smiley": true
                        }
                    }
                },
                {
                    "stepName": "m2q2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q2",
                            "question": "Teammedlemmerne var åbne og oprigtige over for hinanden.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q3",
                            "question": "Teammedlemmerne indrømmede deres svagheder over for teamet.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q4",
                            "question": "Når der opstod konflikt, håndterede teamet dem med det samme, før teamet gik videre til næste aktivitet.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q5",
                            "question": "Teammedlemmerne spurgte ind til de andres holdninger og meninger under aktiviteterne.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q6",
                            "question": "Teamet afslutter diskussioner med klare og specifikke løsninger og handlingspunkter.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q7",
                            "question": "Alle bakkede op om teamets beslutning, også selvom de ikke var 100% enig.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q8",
                            "question": "Alle oplevede et pres fra teamet og der var en forventning om at alle præsenterede.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q9",
                            "question": "Alle gav hinanden spontan og konstruktiv feedback.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q10",
                            "question": "Teammedlemmerne var villige til at bringe ofre på egne områder for teamets skyld.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m2q11",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m2q11",
                            "question": "Hvis teamet ikke kunne nå de fælles mål, tog det enkelte teammedlem personligt ansvar for at forbedre teamets præsentation.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                }
            ]
        }
    },

    longEventAfter: {
        "name": "Efter",
        "number": 3,
        "eventId": "XXX",
        "startTime": "YYY",
        "endTime": "ZZZ",
        "wizard": {
            "steps": [
                {
                    "stepName": "m3q1",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad er din generelle holdning til teambuilding?",
                            "propertyName": "m3q1",
                            "minValue": 1,
                            "maxValue": 5,
                            "step": 1,
                            "defaultValue": 3,
                            "mandatory": true,
                            "positiveText": "positiv",
                            "negativeText": "negativ",
                            "smiley": true
                        }
                    }
                },
                {
                    "stepName": "m3q2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q2",
                            "question": "På din arbejdsplads er I åbne om jeres svagheder?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q3",
                            "question": "På din arbejdsplads er I gode til at give hinanden en undskyldning?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q4",
                            "question": "På din arbejdsplads er I åbne og oprigtige over for hinanden?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q5",
                            "question": "På din arbejdsplads hjælper I hinanden og søger input vedrørende hinandens arbejdsområder?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q6",
                            "question": "På din arbejdsplads fremfører folk deres meninger, også selvom det medfører risiko for uenighed?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q7",
                            "question": "Under møder bliver alle meninger og holdninger inddraget?",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q8",
                            "question": "Når der opstår en konflikt i afdelingen, håndteres den med det samme.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q9",
                            "question": "På team/afdelingsmøder diskuteres de vigtigste og vanskelige problemstillinger.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q10",
                            "question": "Min afdeling/teamet er klar over vores overordnede retning og prioriteter.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q11",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q11",
                            "question": "Afdelings/teammøder afslutter diskussioner med klare og specifikke løsninger og handlingspunkter.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q12",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q12",
                            "question": "Efter møder forlader alle møderne fulde af tillid og alle bakker op om de beslutninger der er truffet.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q13",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q13",
                            "question": "Folk i min afdeling bakker op om de trufne beslutninger, også selvom de ikke er enige som udgangspunkt.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q14",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q14",
                            "question": "På min arbejdsplads giver vi hinanden spontan, konstruktiv feedback.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q15",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q15",
                            "question": "Vi sikrer, at alle føler et pres og at der er en forventning om at alle præsterer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q16",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q16",
                            "question": "Vi konfronterer kollegaer med problemer inden for deres respektive ansvarsområder.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q17",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q17",
                            "question": "Kollegaerne stiller spørgsmål til hinanden om deres aktuelle tilgang og metoder.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q18",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q18",
                            "question": "Teamet/arbejdsgruppen sætter teamets succes over individuelle præsentationer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q19",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q19",
                            "question": "Vi er villige til at bringe ofre på egne områder for teamets/afdelings skyld.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q20",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q20",
                            "question": "Hvis vi ikke når vores fælles mål, tager alle et personligt ansvar for at forbedre afdelingens/teamets præsentationer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                },
                {
                    "stepName": "m3q21",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "m3q21",
                            "question": "Vi er hurtige til at fremhæve andres bidrag og præsentationer.",
                            "answers": [
                                "Næsten aldrig",
                                "Sjældent",
                                "Nogle gange",
                                "Som regel",
                                "Næsten altid"
                            ],
                            "mandatory": true,
                            "multipleChoice": false
                        }
                    }
                }
            ]
        }
    }

};