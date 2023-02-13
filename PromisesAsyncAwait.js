 
 //Questao 2
 // Callback Hell
function doTask1(callback) {
    console.log('Task 1');
    setTimeout(() => {
      callback();
    }, 1000);
  }
  
  function doTask2(callback) {
    console.log('Task 2');
    setTimeout(() => {
      callback();
    }, 1000);
  }
  
  function doTask3(callback) {
    console.log('Task 3');
    setTimeout(() => {
      callback();
    }, 1000);
  }
  
  doTask1(() => {
    doTask2(() => {
      doTask3(() => {
        console.log('All tasks completed');
      });
    });
  });
  
  // Solução usando Promises
  function doTask1P() {
    return new Promise((resolve) => {
      console.log('Task 1');
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  function doTask2P() {
    return new Promise((resolve) => {
      console.log('Task 2');
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  function doTask3P() {
    return new Promise((resolve) => {
      console.log('Task 3');
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  
  doTask1P()
    .then(doTask2P)
    .then(doTask3P)
    .then(() => {
      console.log('All tasks completed');
    });
  
  // Solução usando async/await
  async function runTasks() {
    console.log('Task 1');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Task 2');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Task 3');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('All tasks completed');
  }
  
  runTasks();
  