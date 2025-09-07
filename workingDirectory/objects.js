// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

//console.log(LearnerSubmissions[3].learner_id)

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//console.log(result);



function getID(LearnerSubmissions) {
    let idArr = [];
    for (const i in LearnerSubmissions) {
        
        idArr.push(LearnerSubmissions[i].learner_id)
    }

    return idArr

}

getID(LearnerSubmissions);

function getWeightedAvg(LearnerSubmissions, idArr){
    let total1 = 0;
    let total2 = 0;
    let subCounter = 0;
    let avg = total1 / subCounter;

    console.log("Received IDs from getID: " + idArr);

    for (const i in LearnerSubmissions) {
        if (LearnerSubmissions[i].learner_id === idArr[i]){
            
            total1 += LearnerSubmissions[i].submission.score
            subCounter += 1;

            console.log(`ID: ${LearnerSubmissions[i].learner_id} adding ${LearnerSubmissions[i].submission.score} to total score: ${total1}`)
            
        } 
        
    }
    
 
}

getWeightedAvg(LearnerSubmissions, getID(LearnerSubmissions))

// Removes the duplicate values in array
// to make working with the objects easier.
function checkUniqueID(idArr){
    let trackArr = [];

    for (let i = 0; i <= idArr.length; i++){
        trackArr.push(idArr[i]);
    }
    console.log("Old array:" + trackArr)

    let newArr = [];
    for (let i = 0; i < idArr.length; i++){
        let temp = trackArr[i];
        if (newArr.indexOf(temp) === -1){
            newArr.push(temp);
        }
    }

    console.log("New array: " + newArr);
    return newArr;
}
checkUniqueID(getID(LearnerSubmissions));
console.log("Test checking what function returns: " + checkUniqueID(getID(LearnerSubmissions)));