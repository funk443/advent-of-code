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


(ns aoc.2015.5
  (:use [clojure.java.io :only [reader]]))


(defn main []
  (with-open [rdr (reader "resource/2015/input5")]
    (let [input (line-seq rdr)
          result1 (-> (filter #(and (re-find #"(?:.*(?:a|e|i|o|u).*){3,}" %)
                                    (re-find #"(\w)\1" %)
                                    (not (re-find #"ab|cd|pq|xy" %)))
                              input)
                      count)
          result2 (-> (filter #(and (re-find #"(\w\w).*\1+" %)
                                    (re-find #"(\w)\w\1" %))
                              input)
                      count)]
      (printf "Part 1: %s%nPart 2: %s%n"
              result1
              result2)
      (flush)
      [result1 result2])))
