import os

# Get the commit name
name = input('Enter commit name\n> ')

# build the extension
os.system('npm run build')

# commit
os.system('git pull')
os.system('git add .')
os.system(f'git commit -m "{name}" -a --allow-empty')
os.system('git push')