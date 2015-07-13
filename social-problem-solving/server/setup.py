#!/usr/bin/env python

from distutils.core import setup

from setuptools import find_packages

try:
    license = open('../LICENSE').read()
except:
    license = None

try:
    readme = open('../README.md').read()
except:
    readme = None

setup(name='sps',
      version='0.0.3',
      description='',
      long_description=readme,
      license=license,
      url='https://github.com/AstralDynamics/social-problem-solving',
      author='Enalicho',
      author_email='enalicho@gmail.com',
      packages=find_packages(),
      install_requires=['Flask', 'pymongo'],
)