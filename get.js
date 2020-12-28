let counter = 0

        async function getInfo() {
            let platformName = platform.name;
            let paltformVersion = platform.version;
            let platformLayout = platform.layout;
            let platformOs = platform.os.architecture +" "+platform.os.family +" "+platform.os.version
            let platformDescription = platform.description;
            let dataIp
            let countryName
            let cityName
            let region
            let org
            let postal
            let location


           await fetch('https://api.ipify.org?format=json')
               .then(response => response.json())
               .then(data =>  dataIp = data.ip);

           let resoulation  = screen.width + " x " + screen.height;

           await fetch(`https://ipapi.co/${dataIp}/json/`)
               .then(response => response.json())
               .then(function (data) {
                    countryName = data.country_name;
                    cityName = data.city;
                    region = data.region;
                    org = data.org;
                    postal = data.postal;
                    location = data.latitude + " , " + data.longitude;
               });

               let dateTime = new Date()
               

            await firebase.database().ref('user/').orderByKey().on('value', function (snapshot) {
                if (snapshot.val() != null && snapshot.val() != undefined) {
                    counter = Object.values(snapshot.val()).length
                }})

                await firebase.database().ref('user/'+dateTime).set({
                    dataIp:dataIp,
                    platformName:platformName,
                    paltformVersion :paltformVersion,
                    platformLayout:platformLayout,
                    platformDescription:platformDescription,
                    platformOs:platformOs,
                    resoulation:resoulation,
                    countryName:countryName,
                    cityName:cityName,
                    region:region,
                    org:org,
                    postal:postal,
                    location:location,
                    dateTime:dateTime
                    
                })

                console.log("done")
                
       }
     
window.onload = ()=>{
       getInfo()
}