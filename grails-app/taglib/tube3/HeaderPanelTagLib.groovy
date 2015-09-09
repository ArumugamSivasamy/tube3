package tube3

class HeaderPanelTagLib {
    static namespace = 'tube'
	
	
	def searchTag = {
		out << """
			<div>
				<form name="searchForm" action="../search/findFile">
					<input type="text" name="q" value="Type Here"/>
					<input type="submit" value="Search"/>
				</form>
			</div>
		""" 
	}
    //static encodeAsForTags = [tagName: 'raw']
}
