
import os


def rename_audio():

	os.chdir('/home/noah/dev/sheepzip/audio/welsh')


	for file_name in os.listdir():
		try:
			_, number, language = file_name.split(' ')
			os.replace(file_name, '{}.mp3'.format(number))
		except Exception as e:
			pass


def main():
	rename_audio()

if __name__ == '__main__':
	main()