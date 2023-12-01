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


(ns aoc.2023.1
  (:require [clojure.string :as s])
  (:use [clojure.java.io :only [reader]]))


(defn match-line [regex line]
  (let [number
        (->> (re-matches regex line)
             rest
             (apply str)
             parse-long)]
    (if (< number 10) (* number 11) number)))

(defn main []
  (with-open [rdr (reader "resource/2023/input1")]
    (let [input
          (line-seq rdr)
          regex
          (re-pattern #"\D*(\d).*?(\d{0,1})\D*")
          result1
          (->> (map #(match-line regex %)
                    input)
               (reduce +))
          result2
          (->> (map (fn [line]
                      (->> (reduce #(apply s/replace %1 %2)
                                   line
                                   (map #(vector %1 (format "$1%s$1" %2))
                                        [#"(one)" #"(two)" #"(three)" #"(four)"
                                         #"(five)" #"(six)" #"(seven)"
                                         #"(eight)" #"(nine)"]
                                        (range 1 10)))
                           (#(match-line regex %))))
                    input)
               (reduce +))]
      (printf "Part 1: %s%nPart 2: %s%n"
              result1
              result2)
      [result1 result2])))
