

$("#loginformId").submit(function(event) 
    {
      event.preventDefault();
      login();
});
 function login()
    {
        var formData = {
          email    : $("#loginemail").val(),          
          password :  $("#loginpwd").val()
        }
        
        $('.ajax-loader').css("visibility", "visible");
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url : 'http://techyroots.com:3000/login',
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(response) {
            console.log(response);
            if (response.success == true) {
                $('.ajax-loader').css("visibility", "hidden");
                sessionStorage.setItem('accessToken',response.accessToken);
                // let referral = 'https://linkupesports.com/?id=' +response.data.user_id;
                // alert(referral);
                
                $('#msg').html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+response.msg+"</div>");
                $('#loginemail').val('');
                  $('#loginpwd').val('');
                window.location.href= ('dashboard.html');
            } 
            else {
                $('.ajax-loader').css("visibility", "hidden");
                $('#msg').html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+response.msg+"</div>");
            }
           
        },
        error : function(e) {
            $('.ajax-loader').css("visibility", "hidden");
          console.log("ERROR: ", e);
        }
        
      })
    }
    
    
$("#forgetpasswordgetotpformId").submit(function(event) 
    {
      event.preventDefault();
      forget_password_getotp();
});
  function forget_password_getotp()
    {
        let username = $("#forgetusername").val()      
        let email   = $("#forgetemail").val()
        $('#forget-pass-div').css('display', 'block');
        $('.ajax-loader').css("visibility", "visible");
        $.ajax({
                        type : "POST",
                        contentType : "application/json",
                        url : 'http://techyroots.com:3000/auth/forget_password_get_otp',
                        data : JSON.stringify({
                            username : username,
                            email    : email
                        }),
                        dataType : 'json',
                        success : function(response) {
                            //alert('Otp sent to your mail');
                            
                            if (response.success == true) { 
                                // $('#loading').hide();
                                $('.ajax-loader').css("visibility", "hidden");
                                $('#myforgetModal').css('display', 'none');
                                $('#forgetverify').css('display', 'block');
                                $('#verifyemail').val(email);
                                $('#msg3').html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+response.msg+"</div>");
                                $('#passwordverifybutton').click();
                                
                            } 
                            else {
                                //  $('#loader').hide();
                                $('.ajax-loader').css("visibility", "hidden");
                                $('#forget-pass-div').css('display', 'block');
                                $('#msg2').html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+response.msg+"</div>");
                            }
                            },
                        error : function(e) {
                          $('.ajax-loader').css("visibility", "hidden");
                          alert("Error!")
                          console.log("ERROR: ", e);
                        }
                      });
            
        
    }
    
  $("#forgetpasswordverifyotpformId").submit(function(event) 
    {
      event.preventDefault();
      forget_password_verifyotp();
    });   
    
function forget_password_verifyotp()
    {
        
        var formData = {
          email     :  $("#verifyemail").val(),          
          password  :  $("#verifypwd").val(),
          re_password: $("#verifycpwd").val(),
          otp       :  $("#verifyotp").val()
        }
            $('.ajax-loader').css("visibility", "visible");
            $.ajax({
            type : "POST",
            contentType : "application/json",
            url : 'http://techyroots.com:3000/auth/forget_password_verify_otp',
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(response) {
                console.log(response);
                if (response.success == true) {         
                    $('.ajax-loader').css("visibility", "hidden");
                    
                    $('#myforgetverifyModal').css('display', 'none');
                    $('#myloginModal').css('display', 'block');
                    // document.getElementById("LoginPopUp").click();
                    // document.getElementById("hide-bt").click();
                    $('#msg').html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+response.msg+"</div>");
                    // document.getElementById("exampleInputEmail1").value = formData.email;
                } 
                else {
                    $('.ajax-loader').css("visibility", "hidden");
                    $('#msg1').html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+response.msg+"</div>");
                }
                //alert('Password reset successfully');
                },
            error : function(e) {
                $('.ajax-loader').css("visibility", "hidden");
              alert("Error!")
              console.log("ERROR: ", e);
        }
      });
    }
    
//   $("#form_id").submit(function(event) 
//     {
//      event.preventDefault();
//      show_data();
//     });   
    
    
//     function show_data()
//     {
//           let address =  $("#address").val();
//           let token =  $("#token").val();
//           console.log(address);
//           console.log(token);
//          //alert(`http://techyroots.com:3002/common/ethfunction?module=${module}&token=tokentx&contractAddress=${address}&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=1&offset=10`)
         
//           $.ajax({
//                         type: "GET",
//                         contentType: "application/json",
//                          headers: {
//                               "Authorization": "Bearer " +sessionStorage.getItem('accessToken')
//                             },
                         
//                         url:`http://techyroots.com:3002/common/ethfunction?module=account&token=${token}&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=&offset=10&contractAddress=${address}`,
                                        
//                         dataType: 'json',
//                         success: function(response) {
//                             console.log(response);
//                             $('#profile_tab_t_body').html('')
//                             let count = 0;
//                             let details = response.data.data_ether
//                             console.log(details);
//                             details.forEach(element=>{
//                                 count++;
//                                 $('#profile_tab_t_body').append(`<tr><td>${count}</td><td>${element.from}</td><td>${element.to}</td><td>${element.contract_address}</td><td>${element.value}</td><td>${element.timestamp}</td></tr>`)
//                             })
//                             $('#profile_example').DataTable();
                                
                        
//                         }
//                     });
//                     console.log(address);

        
//     }
    
    // function trans_data()
    // {
    //     //   let address =  $("#address").val();
    //     //   let token =  $("#token").val();
    //     //   console.log(address);
    //     //   console.log(token);
    //      //alert(`http://techyroots.com:3002/common/ethfunction?module=${module}&token=tokentx&contractAddress=${address}&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=1&offset=10`)
         
    //       $.ajax({
    //                     type: "GET",
    //                     contentType: "application/json",
    //                      headers: {
    //                           "Authorization": "Bearer " +sessionStorage.getItem('accessToken')
    //                         },
                         
    //                     url:`http://techyroots.com:3002/common/ethfunction?module=account&token=${token}&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=&offset=10&contractAddress=${address}`,
                                        
    //                     dataType: 'json',
    //                     success: function(response) {
    //                         console.log(response);
    //                         $('#profile_tab_t_body').html('')
    //                         let count = 0;
    //                         let details = response.data.data_ether
    //                         console.log(details);
    //                         details.forEach(element=>{
    //                             count++;
    //                             $('#profile_tab_t_body').append(`<tr><td>${count}</td><td>${element.from}</td><td>${element.to}</td><td>${element.contract_address}</td><td>${element.value}</td><td>${element.timestamp}</td></tr>`)
    //                         })
    //                         $('#profile_example').DataTable();
                                
                        
    //                     }
    //                 });
    //                 console.log(address);

        
    // }
    
    


//     $(document).ready(function() {
//     $('#profile_example').DataTable();
//     $('#profile_example2').DataTable();
// } );

 