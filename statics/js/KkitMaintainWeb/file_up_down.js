
    var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function() {
        return rand() + rand(); // to make it longer
    };

    //console.log(token());


    $(document).ready(function(){

        var page_url = "{% url 'multitask_file' %}";
        $("#submit_task_confirm").attr("onclick","submit_task(this,'" + page_url + "')");
// {#  上传下载切换   #}
        $("#task_type").on("change",function(){
            var t = $('input:radio[name="optionsRadios"]:checked').val();
            if ( t == 'file_send'){

                $(".file-input").removeClass("hide");
                $("#file-download-to-local").addClass("hide")
            }else{

                $(".file-input").addClass("hide");
                $("#file-download-to-local").removeClass("hide")
            }

        });//end on change




        function FileFormSubmit(task_type,params){
            var post_url = "{% url 'multitask_file' %}";
            console.log( params);
            $.post(post_url,{'task_type':task_type,'params':JSON.stringify(params)}, function(callback){

                console.log(callback);
            })

        }

        $("#file_upload").fileinput({
            uploadUrl: "/api/multitask/file_upload/", // server upload action
            uploadAsync: true,
            language:'zh',
            maxFileSize:2000,
            maxFileCount: 5,
            addRemoveLinks:true
        });

        $('#file_upload').on('fileuploaded', function(event, data, previewId, index) {
            var form = data.form, files = data.files, extra = data.extra,
                response = data.response, reader = data.reader;
        });


$('#file_form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            remote_file_path: {
                message: 'The field is not valid',
                validators: {
                    notEmpty: {
                        message: 'The remote file path  is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 128,
                        message: 'The file path must be more than 6 and less than 128 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\/\.]+$/,
                        message: 'The file path can only consist of alphabetical, number and underscore'
                    }
                }
            }

        }
    });//end form validator


    });//end document ready
