function Student(name) { 
    function People(name) {
        console.log("Hi! This is "+name);
    }
    People.prototype.sleep =function(time=0) {
      return new Promise((resolve)=>setTimeout(console.log("Wake up after "+time),time*1000));
    }
   
      People.prototype.sleepFirst =function(time=0) {
    }
  
    People.prototype.study =async function(course) {
      await People.sleep();
      console.log("Study "+course+"~");
    }
    return new People(name);
  }
  
  Student('fxy');
  Student('fxy').sleep(3).study('javascript');
    Student('fxy').study('javascript').study('Vue');
    Student('fxy').sleepFirst(5).study('Ajax');