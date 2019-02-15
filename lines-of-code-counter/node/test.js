(async ()=>{
    // 模拟每次接受请求都会被动更新状态
    let counter = 10;
    let async = async ()=>new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(counter--);
            }, Math.random()*500);
        });

    // 模拟主动更新自身状态
    let counter2 = 10;
    let timer = setInterval(()=>{
        counter2-=1;
        if(counter2 < 0){
            clearInterval(timer);
        }
    }, 1000);
    let async2 = async()=>new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(counter2);
        }, 100); // 假装这里的操作需要点时间
    });


    function getSomeData() {
      return new Promise(async function body(resolve, reject) {    
        async().then(data=>{
            console.log(`async() == ${data}`);
            if(data < 0){
                resolve(data);
            }else{
                setTimeout(()=>{
                    body(resolve, reject);
                }, 50); // 避免过于频繁的调用导致UI卡死
            }
        });
      });
    }

    function getSomeData2() {
      return new Promise(async function body(resolve, reject) {    
        async2().then(data=>{
            console.log(`async2() == ${data}`);
            if(data < 0){
                resolve(data);
            }else{
                setTimeout(()=>{
                    body(resolve, reject);
                }, 10); // 避免过于频繁的调用导致UI卡死
            }
        });
      });
    }

    console.log(`Done with async: ${await getSomeData()}`);
    console.log(`Done with async2: ${await getSomeData2()}`);
})();