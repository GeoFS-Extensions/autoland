import os

name = input('Enter commit name\n> ')

os.system('npm run build')
os.system('git pull')
os.system('git add .')
os.system(f'git commit -m "${name}" -a --allow-empty')
os.system('git push')