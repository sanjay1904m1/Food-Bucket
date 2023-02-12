// get elements by their id name
const searchbtn=document.getElementById("searchBtn");
const meallist=document.getElementById('meal');

const mealcontent=document.querySelector('.mealContent');
const recipeclose=document.getElementById('recipeClose');

// on click it should call the function getMealList
searchbtn.addEventListener('click', getMealList);
meallist.addEventListener('click',  getDetails);
recipeclose.addEventListener('click', closepane);
//getmealList function
function getMealList(){
    let searchContent = document.getElementById('searchText');
    searchTxt=searchContent.value;
    if(searchTxt!="" && searchTxt.length >0){
        document.getElementById('nosearch').style.display='none';
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxt}`)
        .then(res => res.json())
        .then(data => {
            let html ="";
            if(data.meals){
                document.getElementById('searchtitle').innerHTML="Your Search Results For :  "+searchTxt;
                document.getElementById('searchtitle').style.display='block';
                // the details tab remained with none is displayed now
            
                data.meals.forEach(meal=>{ // for each king of meal the display should be done
                    
                    html+=`
                
                        <div class="card" data-id="${meal.idMeal}">
                            <div class="mealImage">
                                <img src="${meal.strMealThumb}" alt=""> 
                            </div>
                            <div class="mealName">
                                <h3>${meal.strMeal}</h3>
                                <div class="buttons">
                                    <a href="#" class="recipeBtn">Know More</a>
                                    <button type="submit" class="searchbtn1" id="favlist" onclick="addFavourite(${meal.idMeal})">Add+</button>
                                    
                                </div>
                            </div>
                        </div>`;

                });
                meallist.innerHTML= html;
                searchContent.value="";
            }
            else{
                console.log("No search")
                document.getElementById('nosearch').innerHTML="Sorry, We cant find your search result :)";
                document.getElementById('nosearch').style.display='block';
                searchContent.value=""
                meallist.innerHTML= ""
                document.getElementById('searchtitle').style.display='none';
                
            }
        

        
        });
    }
    else{
        console.log("No search")
        document.getElementById('nosearch').innerHTML="Type to search anything";
        document.getElementById('nosearch').style.display='block';
        document.getElementById('searchtitle').style.display='none';
        searchContent.value=""
        meallist.innerHTML= ""
    }

}

// onclick to bring the page back to Top at 80px
function topFunction() {
    
    document.documentElement.scrollTop = 80 ;
  }

//get the search result and put the cards with elements 
function getMealbyName(name){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            let html ="";
            if(data.meals){
                document.getElementById('searchtitle').innerHTML="Your Search Results For :  "+name;
                document.getElementById('searchtitle').style.display='block';
            
                data.meals.forEach(meal=>{
                    
                    html+=`
                
                        <div class="card" data-id="${meal.idMeal}">
                            <div class="mealImage">
                                <img src="${meal.strMealThumb}" alt="">
                            </div>
                            <div class="mealName">
                                <h3>${meal.strMeal}</h3>
                                <div class="buttons">
                                    <a href="#" class="recipeBtn">Know More</a>
                                    <button type="submit" class="searchbtn1" id="favlist" onclick="addFavourite(${meal.idMeal})">Add+</button>
                                    
                                </div>
                            </div>
                        </div>`;

                });
                meallist.innerHTML= html;
                
            }
            else{
                console.log("No search")
                document.getElementById('nosearch').innerHTML="Sorry, We cant find your search result :)";
                document.getElementById('nosearch').style.display='block';
                
                meallist.innerHTML= ""
                document.getElementById('searchtitle').style.display='none';
                
            }
        

        
        });
}

// get details of any sppecific meal
function getDetails(e){
    e.preventDefault();
    // if the classList has the class named with recipeBtn its details need to be displayed
    if(e.target.classList.contains('recipeBtn')){
        let mealItem=e.target.parentElement.parentElement.parentElement;
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealModel(data.meals));
        
    }

}
// more details of the meal
function mealModel(meal){
    console.log(meal)
    meal=meal[0]
    let html=`
    <h2 class="mealTitle">${meal.strMeal}</h2>
                <p class="mealCatogary">${meal.strCategory}</p>
                <div class="recipe">
                <h3>Steps to prepare</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="mealCircleImage">
                    <img src="${meal.strMealThumb}" alt="">
                </div>`
document.getElementById('mealDetails').style.display='block';
                mealcontent.innerHTML=html;
                mealcontent.parentElement.classList.add('showRecipe');
}

function closepane(){
    document.getElementById('mealDetails').style.display='none';
}

if (localStorage.getItem("favourites")==null) {
    localStorage.setItem("favourites",JSON.stringify([]));
  }else{
    var arr = JSON.parse(localStorage.getItem("favourites"));
  }
  function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
  } 

function addFavourite(id) {
    if (!arr.includes(id) == true) {
      arr.push(id);
      localStorage.setItem("favourites", JSON.stringify(arr));
      alert("your food added in favourites")
    }else{
      alert("your food already added in favourites")
    }
  }


  


