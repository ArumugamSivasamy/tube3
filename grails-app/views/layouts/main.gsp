<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Tube3"/></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<g:javascript library="application"/>
		<style>
		
body {
    padding-top: 50px; /* Required padding for .navbar-fixed-top. Change if height of navigation changes. */
}

.navbar-fixed-top .nav {
    padding: 15px 0;
}

.navbar-fixed-top .navbar-brand {
    padding: 0 15px;
}

@media(min-width:700px) {
    body {
        padding-top: 100px; /* Required padding for .navbar-fixed-top. Change if height of navigation changes. */
    }

    .navbar-fixed-top .navbar-brand {
        padding: 15px 0;
    }
}
		</style>	
		<r:require module="jqueryUi"/>	
		<r:layoutResources />
	</head>
	<body>
		
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <img src="../images/three.png" width="30px" height="30px" alt="">
                </a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <form class="navbar-form navbar-left" role="search">
  			<div class="form-group">
    			<input type="text" class="form-control" placeholder="Search">
  			</div>
  			<button type="submit" class="btn btn-default">Submit</button>
  			<button type="submit" class="btn btn-default">SignUp</button>
  			<button type="submit" class="btn btn-default">SignIn</button>
		</form>
                                 </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
            </div>
        </div>
    </div>
    <!-- /.container -->
		<g:layoutBody/>
		<nav class="navbar navbar-default">
  			<div class="container-fluid">
    			<p class="text-center">copyright@2015</p>
  			</div>
		</nav>
	</body>
</html>
