import os

def run_command(command):
	code = os.system(command)
	if (code != 0) :
		raise ValueError(f'Command "{command}" failed')

# Get the commit name
name = input('Enter commit name\n> ')
if (name == ""):
  raise SystemExit

# build the extension
run_command('npm run build')

# test the extension
run_command('npm run test')

# commit
run_command('git pull')
run_command('git add .')
run_command(f'git commit -m "{name}" -a')
run_command('git push')