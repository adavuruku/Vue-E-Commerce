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
            vue_det_two.totalCost = shoppingCart.map(ele=>ele.price * ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            vue_det_two.no_lesson = shoppingCart.length
        }
    }
 });


 var vue_det_two = new Vue({
    el: '#steptwo',
    data: {
        steptwo:false,
        cartList: shoppingCart,
        no_lesson:0,
        errors:[],
        phoneno:null,
        fullname:null,
        totalCost:0,
        success:false,
        danger:true,
        showcat:true,
        validinput:false
    },
    methods:{
        getImgUrl:(item)=>'resource/'+item.image,
        removeFromCart: function(index){
            vue_det.no_cart -= shoppingCart[index].space
            shoppingCart.splice(index, 1);
            this.totalCost = shoppingCart.map(ele=>ele.price * ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            this.no_lesson = shoppingCart.length
            this.$forceUpdate();
        },
        increaseCart: function(index){
            var count = shoppingCart[index].space
            shoppingCart[index].space = count < 5 ? count +=1 : count
            vue_det.no_cart = shoppingCart.map(ele=>ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            this.totalCost = shoppingCart.map(ele=>ele.price * ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            this.$forceUpdate();
        },
        decreaseCart: function(index){
            var count = shoppingCart[index].space
            shoppingCart[index].space = count > 0 ? count -=1 : count
            vue_det.no_cart = shoppingCart.map(ele=>ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            this.totalCost = shoppingCart.map(ele=>ele.price * ele.space).reduce(( accumulator, currentValue ) => accumulator + currentValue,0)
            if(shoppingCart[index].space<=0){
                this.removeFromCart(index)
            }
            
            this.$forceUpdate();
        },
        submitInput: function(e){
            e.preventDefault()
            this.errors=[]
            if (this.phoneno && this.fullname) {
                if (this.phoneno.length === 11 && this.fullname.length >= 5 && /\s/.test(this.fullname)){
                    this.errors.push('Your Order Has Been Submitted Successfully !!')
                    this.success = true
                    this.danger = false
                    return true;
                }
            }
        },
        validateInput: function(e){
            if (this.phoneno && this.fullname) {
                if (this.phoneno.length === 11 && this.fullname.length >= 5 && /\s/.test(this.fullname)){
                    this.errors=[]
                    this.validinput = true
                    return true;
                }
            }
            
            this.errors = [];
            this.validinput = false;
            if (!this.phoneno) {
              this.errors.push('Provide A Phone Number.');
            }
            if (this.phoneno) {
                if(this.phoneno.length < 11){
                    this.errors.push('Phone Number is Invalid.');
                }
            }
            
            if (!this.fullname) {
              this.errors.push('Provide Your Full Name.');
            }
            if (this.fullname) {
                if(this.fullname.length < 5  || ! /\s/.test(this.fullname)){
                    this.errors.push('Full Name is Invalid (5 Characters Min. & space).');
                }
            }
           
            e.preventDefault()
        },
        preventText:(evt)=>{
            //console.log('I dey here')
            try {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 32 && (charCode < 48 || charCode > 57))) {
                  evt.preventDefault();;
                } else {
                  return true;
                }
            }catch (err) {
                alert(err.Description);
            }

        },
        preventNumber:(evt)=>{
            try {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                //upper case                            lowercase                              space
                if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32) { // space
                    return true;
                }
                evt.preventDefault();
            }catch (err) {
                alert(err.Description);
            }
        },
        openStepOne: function(){
            this.steptwo = false
            vue_det.stepone = true
        }
    }
 });