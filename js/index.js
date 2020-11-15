let shoppingCart = []
var vue_det = new Vue({
    el: '#stepone',
    data: {
        no_cart:0,
        stepone:true,
        lessonList: lessonData,
        show:true,
        showcat:false,
        field:'Subject',
        sorttype:'Asc',
        message:''
    },
    methods:{
        getImgUrl:(item)=>'resource/'+item.image,
        addToCart: function(index){
            var count = lessonData[index].space
            lessonData[index].space = count > 0 ? count-=1 : count

            if (shoppingCart.length > 0){
                var mapList = shoppingCart.map(ele=>ele.subject)
                updateIndex = mapList.indexOf(lessonData[index].subject)
                if (updateIndex >= 0){
                    shoppingCart[updateIndex].space += 1 
                }else{
                    var p = {
                        "subject":lessonData[index].subject,
                        "location":lessonData[index].location,
                        "price":lessonData[index].price,
                        "image":lessonData[index].image,
                        "space":1
                    }
                    shoppingCart.push(p)
                }
                
            }else{
                var p = {
                    "subject":lessonData[index].subject,
                    "location":lessonData[index].location,
                    "price":lessonData[index].price,
                    "image":lessonData[index].image,
                    "space":1
                }
                shoppingCart.push(p)
            }

            this.no_cart = shoppingCart.map(ele=>ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            this.showcat = true
            this.$forceUpdate();
        },
        valueChange: (selected,sortype)=>{
            if(selected === 'Subject'){
                lessonData.sort((a,b) => (a.subject.toUpperCase() > b.subject.toUpperCase()) ? 1 : ((b.subject.toUpperCase() > a.subject.toUpperCase()) ? -1 : 0)); 
            }else if(selected === 'Location'){
                lessonData.sort((a,b) => (a.location.toUpperCase() > b.location.toUpperCase()) ? 1 : ((b.location.toUpperCase() > a.location.toUpperCase()) ? -1 : 0));
            }else if(selected === 'Price'){
                lessonData.sort((a, b) => a.price - b.price);
            }else{
                lessonData.sort((a, b) => a.space - b.space);
            }
            console.log(typeof(sortype))
            if(sortype === 'Desc'){
                lessonData.reverse()
            }
            console.log(selected, sortype)
            //lessonData.sort((a,b)=> a.space
        },
        gotoStepTwo:function(){
            this.stepone = false
            // vue_det.$emit('open_step_two')
            // this.$root.$emit('open_step_two')
            vue_det_two.steptwo = true
        }
    }
 });


 var vue_det_two = new Vue({
    el: '#steptwo',
    data: {
        steptwo:false,
        cartList: shoppingCart,
        showcat:true
    },
    methods:{
        getImgUrl:(item)=>'resource/'+item.image,
        removeFromCart: function(index){
            vue_det.no_cart -= shoppingCart[index].space
            shoppingCart.splice(index, 1);
            this.$forceUpdate();
        },
        increaseCart: function(index){
            var count = shoppingCart[index].space
            shoppingCart[index].space = count < 5 ? count +=1 : count
            vue_det.no_cart = shoppingCart.map(ele=>ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            this.$forceUpdate();
        },
        decreaseCart: function(index){
            var count = shoppingCart[index].space
            shoppingCart[index].space = count > 0 ? count -=1 : count
            vue_det.no_cart = shoppingCart.map(ele=>ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            if(shoppingCart[index].space<=0){
                this.removeFromCart(index)
            }
            this.$forceUpdate();
        },
        openStepOne: function(){
            this.steptwo = false
            vue_det.stepone = true
        }
    }
 });