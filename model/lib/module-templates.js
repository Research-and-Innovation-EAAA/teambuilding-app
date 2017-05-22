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
                    "stepName": "q1",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad var din generelle holdning til teambuilding før dagens forløb?",
                            "propertyName": "q1",
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
                    "stepName": "q2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad har du lært nogle af dine kollegaer bedre at kende i dag?",
                            "propertyName": "q2",
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
                    "stepName": "q3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad tror du, at du vil opleve et bedre samarbejde på din arbejdsplads efter dagens forløb?",
                            "propertyName": "q3",
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
                    "stepName": "q4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad er du tilfreds med den måde I løste dagens udfordringer?",
                            "propertyName": "q4",
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
                    "stepName": "q5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad kan dele af dagens aktiviteter overføres til udfordringer på din arbejdsplads?",
                            "propertyName": "q5",
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
                    "stepName": "q6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad oplevede du i dag at der var en eller flere der tog ledelse?",
                            "propertyName": "q6",
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
                    "stepName": "q7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "I hvor høj grad er du tilfreds med jeres engagement i dagens forløb?",
                            "propertyName": "q7",
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
                    "stepName": "q8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvordan er din holdning til jeres samarbejde i dag?",
                            "propertyName": "q8",
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
                    "stepName": "q9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvordan er din holdning til din egen indsats i dag?",
                            "propertyName": "q9",
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
                    "stepName": "q10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Efter dagens forløb hvad er din generelle vurdering af dagen?",
                            "propertyName": "q10",
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
                    "stepName": "Teamarbejde",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Arbejder du normalt alene eller i et team?",
                            "propertyName": "aleneEllerTeam",
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
                    "stepName": "Jobprofil",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "jobprofil",
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
                    "stepName": "Holdning",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad er din generelle holdning til teambuilding?",
                            "propertyName": "fholdning",
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
                    "stepName": "f1",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f1",
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
                    "stepName": "f2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f2",
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
                    "stepName": "f3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f3",
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
                    "stepName": "f4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f4",
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
                    "stepName": "f5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f5",
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
                    "stepName": "f6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f6",
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
                    "stepName": "f7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f7",
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
                    "stepName": "f8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f8",
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
                    "stepName": "f9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f9",
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
                    "stepName": "f10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f10",
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
                    "stepName": "f11",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f11",
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
                    "stepName": "f12",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f12",
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
                    "stepName": "f13",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f13",
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
                    "stepName": "f14",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f14",
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
                    "stepName": "f15",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f15",
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
                    "stepName": "f16",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f16",
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
                    "stepName": "f17",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f17",
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
                    "stepName": "f18",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f18",
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
                    "stepName": "f19",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f19",
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
                    "stepName": "f20",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "f20",
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
                    "stepName": "Holdning",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad er din generelle holdning til teambuilding?",
                            "propertyName": "uholdning",
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
                    "stepName": "u1",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u1",
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
                    "stepName": "u2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u2",
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
                    "stepName": "u3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u3",
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
                    "stepName": "u4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u4",
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
                    "stepName": "u5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u5",
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
                    "stepName": "u6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u6",
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
                    "stepName": "u7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u7",
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
                    "stepName": "u8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u8",
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
                    "stepName": "u9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u9",
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
                    "stepName": "u10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "u10",
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
                    "stepName": "Holdning",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/slider.html",
                        "config": {
                            "question": "Hvad er din generelle holdning til teambuilding?",
                            "propertyName": "eholdning",
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
                    "stepName": "e1",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e1",
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
                    "stepName": "e2",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e2",
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
                    "stepName": "e3",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e3",
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
                    "stepName": "e4",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e4",
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
                    "stepName": "e5",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e5",
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
                    "stepName": "e6",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e6",
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
                    "stepName": "e7",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e7",
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
                    "stepName": "e8",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e8",
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
                    "stepName": "e9",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e9",
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
                    "stepName": "e10",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e10",
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
                    "stepName": "e11",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e11",
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
                    "stepName": "e12",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e12",
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
                    "stepName": "e13",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e13",
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
                    "stepName": "e14",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e14",
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
                    "stepName": "e15",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e15",
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
                    "stepName": "e16",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e16",
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
                    "stepName": "e17",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e17",
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
                    "stepName": "e18",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e18",
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
                    "stepName": "e19",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e19",
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
                    "stepName": "e20",
                    "stepTemplate": {
                        "url": "client/components/wizard/templates/single-question.html",
                        "config": {
                            "propertyName": "e20",
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