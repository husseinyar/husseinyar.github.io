function StationNamesForList(charing)
{
    var charachterLenght = charing.value;
        
         
    if (charachterLenght.length >= 3) 
    {
        const url = `https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=0a0aa632ed664ff1bc40998b37defc99&searchstring=${charing.value}&stationsonly=true`;

        const optionsList = document.getElementById("stations");
        
        fetch(url)

            .then((reps) => reps.json())

                .then(function (data)
                {
                    document.getElementById("stations").innerHTML = "";
                    
                    let stations = data.ResponseData;

                    stations.map(function (station)
                    {
                        let div = creatingElement('option');

                        div.innerHTML = station.Name;
                        
                        append(optionsList, div);
                    })
                })
    }
}
function GetStationID(stationName)
{ 
    const url = `https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=0a0aa632ed664ff1bc40998b37defc99&searchstring=${stationName.value}&stationsonly=true`;
  
    fetch(url)

        .then((reps) => reps.json())

            .then(function (data)
            {
                let stations = data.ResponseData;

                stations.map(function (station)
                {
                    if(station.Name === stationName.value) 
                    {
                        id = station.SiteId;
                        document.getElementById("myary").innerHTML = stationName.value;
                    }
                })
                Start();
            })
}

function creatingElement(element) 
{
    return document.createElement(element);
}

function append(parent, el) 
{
    return parent.appendChild(el);
}

function GetStationID(stationName)
{ 
    const url = `https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=0a0aa632ed664ff1bc40998b37defc99&searchstring=${stationName.value}&stationsonly=true`;
  
    fetch(url)

        .then((reps) => reps.json())

            .then(function (data)
            {
                let stations = data.ResponseData;

                stations.map(function (station)
                {
                    if(station.Name === stationName.value) 
                    {
                        id = station.SiteId;
                        document.getElementById("myary").innerHTML = stationName.value;
                    }
                })
                Start();
            })
}

function Clean()
{
    document.getElementById("symbol").innerHTML = "";
    document.getElementById("first").innerHTML = "";
    document.getElementById("second").innerHTML = "";
    document.getElementById("third").innerHTML = "";
}

function Start()
{
    Clean();


    const url = `https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.json?key=e97dc7ae9ec14b03b24007aeea1a681a&siteid=${id}&timewindow=10`;

    fetch(url)

        .then((resp) => resp.json())

            .then(function (data){
                
                let transport = data.ResponseData;

                if (transport.Buses.length != 0) 
                {
                    symbolName = "Buss"
                        
                    let transport = data.ResponseData.Buses;

                    LoopyDoopy(transport);
                }
                if (transport.Metros.length != 0) 
                {
                    symbolName = "Tåg"
                    
                    let transport = data.ResponseData.Metros;

                    LoopyDoopy(transport);
                }
                if (transport.Trains.length != 0) 
                {
                    symbolName = "Pendel"
                        
                    let transport = data.ResponseData.Trains;
                   
                    LoopyDoopy(transport);
                }
                if (transport.Trams.length != 0) 
                {
                    symbolName = "Spårvagn"
                        
                    let transport = data.ResponseData.Trams;

                    LoopyDoopy(transport);
                }
                
                setInterval(Start, 60000);
            })

        .catch(function (error){
            document.getElementById("myary").innerHTML = error;
        })
}

function LoopyDoopy(transport)
{
    const symbol = document.getElementById("symbol");
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");

    transport.map(function (transports) 
    {
        let transportName = creatingElement('div');
            lineNumber = creatingElement('div'),
            destinationName = creatingElement('div')
            time = creatingElement('div');

        transportName.innerHTML = symbolName;
        lineNumber.innerHTML = transports.LineNumber;
        destinationName.innerHTML = transports.Destination;
        time.innerHTML = transports.DisplayTime;
        
        append(symbol, transportName);
        append(first, lineNumber);
        append(second, destinationName);
        append(third, time);
    })
}

function ChangeTime()
{
    if (document.getElementById("radioBtn").checked === false) 
    {
        Start();
    }
    
    var elem3 = document.getElementById("third");

    for (let i = 0; i < elem3.childNodes.length; i++) 
    {
        if (elem3.childNodes[i].innerHTML !== "Nu") 
        {
            let elementMin = elem3.childNodes[i].innerHTML;
            let nr = parseInt(elementMin);

            if (nr > 5) 
            { 
                let minus = nr - 5;
                elem3.childNodes[i].innerHTML = minus + " " + "min";
            }
        }
    }
}