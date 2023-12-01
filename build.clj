;;;; Copyright (C) 2023  CToID <funk443@yandex.com>
;;;; 
;;;; This program is free software: you can redistribute it and/or modify it
;;;; under the terms of the GNU General Public License as published by the Free
;;;; Software Foundation, either version 3 of the License, or
;;;; (at your option) any later version.
;;;; 
;;;; This program is distributed in the hope that it will be useful, but WITHOUT
;;;; ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
;;;; FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
;;;; more details.
;;;; 
;;;; You should have received a copy of the GNU General Public License along
;;;; with this program.  If not, see <https://www.gnu.org/licenses/>.


(ns build
  (:require [clojure.tools.build.api :as b]))


(def lib 'id/advent-of-code)
(def version "2015")
(def basis (b/create-basis))
(def class-dir "target/classes")
(def src-dirs ["src"])
(def uber-file (format "target/%s.jar" (name lib)))


(defn clean [& args]
  (b/delete {:path "target"}))

(defn uberjar [& args]
  (clean)
  (b/copy-dir {:target-dir class-dir
               :src-dirs src-dirs})
  (b/write-pom {:basis basis
                :class-dir class-dir
                :lib lib
                :version version
                :src-dirs src-dirs})
  (b/compile-clj {:basis basis
                  :class-dir class-dir
                  :src-dirs src-dirs})
  (b/uber {:uber-file uber-file
           :class-dir class-dir
           :basis basis
           :main 'aoc.main}))
