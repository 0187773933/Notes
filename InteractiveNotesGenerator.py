#!/usr/bin/env python3
import sys
from pprint import pprint
from pathlib import Path
import shutil
import json
import base64

def write_json( file_path , python_object ):
	with open( file_path , 'w', encoding='utf-8' ) as f:
		json.dump( python_object , f , ensure_ascii=False , indent=4 )

def read_json( file_path ):
	with open( file_path ) as f:
		return json.load( f )

def write_text( file_path , text_lines_list ):
	#with open( file_path , 'a', encoding='utf-8' ) as f:
	with open( file_path , 'w', encoding='utf-8' ) as f:
		f.writelines( text_lines_list )

def read_text( file_path ):
	with open( file_path ) as f:
		return f.read().splitlines()

JQUERY_UI_CSS_INTEGRITY = "sha256-RPilbUJ5F7X6DdeTO6VFZ5vl5rO5MJnmSk4pwhWfV8A="
JQUERY_JS_INTEGRITY = "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
BOOTSTRAP_CSS_INTEGRITY = "sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
BOOTSTRAP_JS_INTEGRITY = "sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
JQUERY_UI_JS_INTEGRITY = "sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
# JQUERY_UI_CSS_INTEGRITY = ""
# JQUERY_JS_INTEGRITY = ""
# BOOTSTRAP_CSS_INTEGRITY = ""
# BOOTSTRAP_JS_INTEGRITY = ""
# JQUERY_UI_JS_INTEGRITY = ""


def build_drag_and_drop_html( options ):
	return f'''<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>{options["title"]}</title>
	<link rel="stylesheet" href="https://39363.org/CDN/jquery-ui.css" integrity="{JQUERY_UI_CSS_INTEGRITY}" >
	<script src="https://39363.org/CDN/jquery-3.6.0.min.js" integrity="{JQUERY_JS_INTEGRITY}"></script>
	<link rel="stylesheet" href="https://39363.org/CDN/bootstrap.min.css" integrity="{BOOTSTRAP_CSS_INTEGRITY}">
	<script src="https://39363.org/CDN/bootstrap.bundle.min.js" integrity="{BOOTSTRAP_JS_INTEGRITY}"></script>
	<script src="https://39363.org/CDN/jquery-ui.min.js" integrity="{JQUERY_UI_JS_INTEGRITY}" ></script>
	<script src="https://39363.org/CDN/NOTES/interactive_drag_and_drop.js"></script>
</head>
<body>
	<div id="label-container">
		{options["image_map"]}
	</div>
	<div class="container">
		<div class="row justify-content-start">
			<div class="col-2">
				<div id="draggable-label-container"></div>
			</div>
			<div class="col-10">
				<canvas id="interactive-image-canvas"></canvas>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		window.image_source_url = "{options["image_source_url"]}";
		window.next_challenge_url = "{options["next_challenge_url"]}";
		window.image_scale_percentage = {options["image_scale_percentage"]};
		window.unanswered_color = "{options["unanswered_color"]}";
		window.answered_color = "{options["answered_color"]}";
		window.text_color = "{options["text_color"]}";
		window.text_font = "{options["text_font"]}";
		window.text_x_offset_factor = {options["text_x_offset_factor"]};
		window.text_y_offset_factor = {options["text_y_offset_factor"]};
		start_interactive_drag_and_drop();
	</script>
</body>
</html>'''

def build_typing_html( options ):
	return f'''<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>{options["title"]}</title>
	<link rel="stylesheet" href="https://39363.org/CDN/jquery-ui.css" integrity="{JQUERY_UI_CSS_INTEGRITY}" >
	<script src="https://39363.org/CDN/jquery-3.6.0.min.js" integrity="{JQUERY_JS_INTEGRITY}"></script>
	<link rel="stylesheet" href="https://39363.org/CDN/bootstrap.min.css" integrity="{BOOTSTRAP_CSS_INTEGRITY}">
	<script src="https://39363.org/CDN/bootstrap.bundle.min.js" integrity="{BOOTSTRAP_JS_INTEGRITY}"></script>
	<script src="https://39363.org/CDN/jquery-ui.min.js" integrity="{JQUERY_UI_JS_INTEGRITY}" ></script>
	<script src="https://39363.org/CDN/NOTES/interactive_typing.js"></script>
</head>
<body>
	<div id="label-container">
		{options["image_map"]}
	</div>
	<div>
		<center><canvas id="interactive-image-canvas"></canvas></center>
	</div>
	</br>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-2"></div>
			<div class="col-8">
				<div class="input-group">
					<span class="input-group-text" id="bootstrap-answer-companion">Answer</span>
					<input autofocus id="input-answer" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="bootstrap-answer-companion">
					<button class="btn btn-outline-secondary" type="button" id="hint-button">Hint</button>
				</div>
			</div>
			<div class="col-2"></div>
		</div>
		</br>
		<div class="row justify-content-center">
			<div class="col-2"></div>
			<div class="col-8">
				<p id="hint-area" class="text-center"></p>
			</div>
			<div class="col-2"></div>
		</div>
	</div>
	<script type="text/javascript">
		window.image_source_url = "{options["image_source_url"]}";
		window.next_challenge_url = "{options["next_challenge_url"]}";
		window.image_scale_percentage = {options["image_scale_percentage"]};
		window.unanswered_color = "{options["unanswered_color"]}";
		window.answered_color = "{options["answered_color"]}";
		window.text_color = "{options["text_color"]}";
		window.text_font = "{options["text_font"]}";
		window.text_x_offset_factor = {options["text_x_offset_factor"]};
		window.text_y_offset_factor = {options["text_y_offset_factor"]};
		start_interactive_typing();
	</script>
</body>
</html>'''

if __name__ == "__main__":
	config = read_json( sys.argv[1] )
	if "images" not in config:
		sys.exit( 1 )

	input_config_path = Path( sys.argv[1] )
	output_base_dir =  input_config_path.parent.joinpath( config["title"] )
	try:
		shutil.rmtree( output_base_dir )
	except Exception as e:
		pass
	output_base_dir.mkdir( parents=True , exist_ok=True )
	drag_and_drop_base_dir = output_base_dir.joinpath( "DragAndDrop" , config["title"] )
	drag_and_drop_base_dir.mkdir( parents=True , exist_ok=True )
	typing_base_dir = output_base_dir.joinpath( "Typing" , config["title"] )
	typing_base_dir.mkdir( parents=True , exist_ok=True )
	print( output_base_dir.absolute() )

	names = [ x[0] for x in config["images"] ]
	next_names = []
	next_indexes = []
	for index , value in enumerate( names ):
		next_names.append(  names[ index ] )
		next_indexes.append( index )
	next_names.append( names[ 0 ] )
	next_names = next_names[ 1: ]
	next_indexes.append( next_indexes[ 0 ] )
	next_indexes = next_indexes[ 1: ]
	# print( names )
	# print( next_names )
	total_images = len( config["images"] )
	for index , question in enumerate( config["images"] ):
		# write_text( file_path , text_lines_list )
		index_prefix = str( index + 1 ).zfill( 3 )
		next_index_prefix = str( next_indexes[ index ] + 1 ).zfill( 3 )
		next_index = 0

		image_source_url = question[ 1 ]
		image_map = base64.b64decode( question[ 2 ] ).decode( "utf-8" )
		next_challenge_drag_and_drop_url = f'https://39363.org/NOTES/WSU/2021/Fall/ANT3100/Interactive/DragAndDrop/{config["title"]}/{next_index_prefix}-{next_names[index]}.html'
		next_challenge_typing_url = f'https://39363.org/NOTES/WSU/2021/Fall/ANT3100/Interactive/Typing/{config["title"]}/{next_index_prefix}-{next_names[index]}.html'
		print( next_challenge_drag_and_drop_url )
		drag_and_drop_output_path = drag_and_drop_base_dir.joinpath( f"{index_prefix}-{names[index]}.html" )
		drag_and_drop_html = build_drag_and_drop_html({
			"title": names[index] ,
			"image_map": image_map ,
			"image_source_url": image_source_url ,
			"next_challenge_url": next_challenge_drag_and_drop_url ,
			"image_scale_percentage": 60 ,
			"unanswered_color": "red" ,
			"answered_color": "#13E337" ,
			"text_color": "white",
			"text_font": "17px Arial" ,
			"text_x_offset_factor": 2,
			"text_y_offset_factor": 3,
		})
		write_text( str( drag_and_drop_output_path ) , [ drag_and_drop_html ] )

		typing_output_path = typing_base_dir.joinpath( f"{index_prefix}-{names[index]}.html" )
		typing_html = build_typing_html({
			"title": names[index] ,
			"image_map": image_map ,
			"image_source_url": image_source_url ,
			"next_challenge_url": next_challenge_typing_url ,
			"image_scale_percentage": 60 ,
			"unanswered_color": "red" ,
			"answered_color": "#13E337" ,
			"text_color": "white",
			"text_font": "17px Arial" ,
			"text_x_offset_factor": 2,
			"text_y_offset_factor": 3,
		})
		write_text( str( typing_output_path ) , [ typing_html ] )
