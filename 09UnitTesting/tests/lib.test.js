
const lib= require('./lib')
const fiz=require('./fiz')
const db= require('./db')
const mail= require('./mail')
// /********************
//  * How can test the numbers
//  */

// describe('absolute', ()=>{
//     it('testing should return positive if the number is positive',()=>{
//         const result= lib.absolute(1)
//         expect(result).toBe(1)
//     });
    
//     it('testing should return positive if the number is negative',()=>{
//         const result= lib.absolute(-1)
//         expect(result).toBe(1)
//     });
    
//     it('testing should return zero if the number is zero',()=>{
//         const result= lib.absolute(0)
//         expect(result).toBe(0)
//     });

// })
// /******************************************************
//  *  String test
//  * 
//  */

// describe('Greet function',()=>{
//     it('it will return a greet message', ()=>{
//         const result= lib.greet('asad')
//         //expect(result).toMatch(/asad/)
//         expect(result).toContain('asad')
//     })
// })

// /****************************************
//  * Array testing
//  */

// describe('Get currencies',()=>{
//     it('Shout return Currencies', ()=>{
//         const result= lib.getCurrencies();
//         // // So general way
//         // expect(result).toBeUndefined()// if we get number array still this will pass and not give error
//         // expect(result).not.toBeNull() //  same condition if we return the numbers array still this will not give error 

//         // // so specific way
//         // expect(result[0]).toBe('USD') // if we change the location in function 
//         // expect(result[1]).toBe('AUD')  // then the test will fail and it so hard to identify the error
//         // expect(result[2]).toBe('EUR')   

//         // better way 
//         expect(result).toContain('USD') // even if we change the location we will get USD if have an array.
//         expect(result).toContain('AUD')
//         expect(result).toContain('EUR')

//         // Ideal way 
//         expect(result).toEqual(expect.arrayContaining(['USD','EUR' ,'AUD']))
//     })
// })

// describe("Product",()=>{
//     it('test should get product', ()=>{
//         const result = lib.getProduct();

//         // this will be failed because result and {id:1, price:20} is not reference the same memory
//         // so this will return false
//        // expect(result).toBe({id:1, price:20})
        
//        // if the object have more properties then it will failed
//        // suppose if get result {id:1, price:20, category:'a'}
//        // expect(result).toEqual({id:1, price:20}) 
        
//        expect(result).toMatchObject({id:1, price:20})

//        expect(result).toHaveProperty('id',1)

//     })
// })

// describe("Register User", ()=>{
//     it("User is register successful ", ()=>{
//         const result = lib.registerUser("asad");
//         expect(result).toMatchObject({name:"asad"})
//         expect(result.id).toBeGreaterThan(0)
//     })

//     it("Should throw a error if user is falsy ", ()=>{
//         // the falsy (null , undefined, NaN , '', 0 , false)
//         // if you want to test for all values then
//         const values= [null, undefined,NaN,'', 0, false ];
//         values.forEach(a=>{
//             expect(()=>{lib.registerUser(a)}).toThrow();
//         })
        
//     })
// })


describe('FizzBuzz',()=>{
    it('number not divide 3 and 5 then return number',()=>{
        const result = fiz(1)
        expect(result).toBe(1);
    })
    it('Number is divided by 3 then return "Fizz"',()=>{
        const result= fiz(3)
        expect(result).toContain('Fizz')
    })
    it('Number is divided by 5 then return "Buzz"',()=>{
        const result= fiz(5)
        expect(result).toContain('Buzz')
    })

    it('Number is divided by 3 and 5 then return "FizzBuzz"',()=>{
        const result= fiz(15)
        expect(result).toContain('FizzBuzz')
    })

    it('Not send a number then throw error"',()=>{
       // const result= fiz(15)
        expect(()=>{fiz("fdsf")}).toThrow()
    })
})

describe('apply discount',()=>{
    it('should apply 10 % discount  if customer has more  than 10 more points',()=>{
        db.getCustomerSync= function(customerId){
            console.log('Make a fake customer...')
              return {id:1,  points:11};
        }
        let order = {customerId:1, totalPrice:10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)

    })
})

describe('notifyCustomer',()=>{
    /**********************************************
     *  // first call the db and later implement function
     *  // In the Unit test can not interaction with db
     *  // So there is two method 
     *  // 1 method ----> call the db and implement that method db.getCustomerSync
     *  // it make the fake customer and do not interaction with database
     *  db.getCustomerSync = function (customerID) {
            console.log('Make a fake customer...')
            return {id:1,  points:11};
            
        }

        // 2 method is jest mock
        
        const mockFunction= jest.fn();
        mockFunction.mockReturnValue(1) //so this will return 1
        mockFunction.mockResolvedValue(1) // after wait then return resolved promise
        mockFunction.mockRejectValue(1)     // after wait then return reject promise which will operate in try catch block

        
    ***********************************************/

    it('should send a mail to customer',()=>{
        // db.getCustomerSync = function (customerID) {
        //     console.log('Make a fake customer...')
        //     return {email:'a'};
            
        // }
        // let mailSend=false
        // mail.send=function (email, message) {
        //    mailSend= true;
        // }
        // lib.notifyCustomer({customerID:1})
        // expect(mailSend).toBe(true)

       
        db.getCustomerSync= jest.fn().mockReturnValue({email:'a'})
        mail.send= jest.fn(); 
       lib.notifyCustomer({customerID:1})
       
        // if the args are (number , boolean). But here is string so use second method
      //  expect(mail.send).toHaveBeenCalledWith('a',"your order was placed successfully")
         
      // if the args is string then use the following method
      expect(mail.send).toHaveBeenCalled();
      console.log(mail.send.mock.calls)
       // expect(mail.send.mock.calls[0][0]).toBe('a')
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)
       

    })
})