const searchbtn=document.getElementById("searchBtn");
const meallist=document.getElementById('meal');

const mealcontent=document.querySelector('.mealContent');
const recipeclose=document.getElementById('recipeClose');

// get favourites heros id from local storage and store in an array
// stores the charcter id
var arr = JSON.parse(localStorage.getItem("favourites"));
console.log(arr);

if(arr.length==0){
    document.getElementById('nofav').style.display='block'
}
else{
    document.getElementById('nofav').style.display='none'
}
// // function for show heros full details in a new page
// function showDetails(idnumber) {
//     localStorage.setItem("id", idnumber);
//     window.location = "index2.html";
// }


// function for remove hero from favourites, update localstorage and reload page
function removeitem(id) {
    var index=arr.indexOf(id);
    console.log(index);
    arr.splice(index,1);
    console.log(arr);
    localStorage.setItem("favourites",JSON.stringify(arr));
    alert("your food remove successfulled");
    location.reload();
}

let html=""
//function for show all favourites heros in html page 
function fetchData(){
  
    for (let i = 0; i < arr.length; i++) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arr[i]}`)
            .then(response => response.json())
            .then(data => mealModel(data.meals));
        
    }

}
        

function mealModel(meal){
    console.log(meal)
    meal=meal[0]
    html+= `
                <div class="card" data-id="${meal.idMeal}">
                    <div class="mealImage">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="mealName">
                        <h3>${meal.strMeal}</h3>
                        <div class="buttons">
                            
                            <button type="submit" class="searchbtn1" id="favlist" onclick="removeitem(${meal.idMeal})">Remove-</button>
                            
                        </div>
                    </div>
                </div>`;

}

function removeAll(){
    let a=arr.length;
    for (let i = 0; i < a; i++) {
        var index=arr.indexOf(arr[i]);
        arr.splice(index,1);
        localStorage.setItem("favourites",JSON.stringify(arr));
        
       
    }
    location.reload();
    
    

}

          
            
            
            
            
            
                  
            
 
setTimeout(() => {
    document.getElementById("cards-group").innerHTML=html;
}, 1000);
    