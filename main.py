import requests

team1 = ""

teamsData = requests.get("http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&sort_order=name_asc&season=2019").json()
print(teamsData.team_all_season.queryResults.row.mlb_org_id)

print(teamsData)
