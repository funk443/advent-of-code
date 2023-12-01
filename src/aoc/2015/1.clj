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


(ns aoc.2015.1
  (:use [clojure.string :only [trim]]))


(defn main []
  (let [input (->> (slurp "resource/2015/input1")
                   trim
                   (mapv #(if (= % \() 1 -1)))
        result1 (reduce + input)
        result2 (reduce (fn [[current-floor counter] move]
                          (cond
                            (= current-floor -1)
                            (reduced counter)
                            :else
                            [(+ current-floor move)
                             (inc counter)]))
                        [0 0]
                        input)]
    (printf "Part 1: %s%nPart 2: %s%n"
            result1
            result2)
    (flush)
    [result1 result2]))
